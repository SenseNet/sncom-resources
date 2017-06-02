---
title: "Indexing activity queue speedup"
author: tusmester
tags: [enterprise content management, indexing, speedup]
---

In Sense/Net ECM we rely heavily on our Lucene indexing and search engine: every content modification involves re-indexing the data

---

In Sense/Net ECM we rely heavily on our Lucene indexing and search engine: every content modification involves re-indexing the data. This means our indexing subsystem sometimes must handle a really heavy load when many users create or modify content at the same time.
In an environment where there are multiple web servers (both generating new indexing activities as users work) things tend to get more complicated and vulnerable to concurrency errors. Indeed we found out that there was a possibility of executing indexing activities in a reversed order. In most cases this is not a problem (who cares in which order two documents are indexed), but in case of an 'update' and a 'delete' activity for the same content this is definitely unwanted (think delete first than update) as the index will still contain documents that should not be there.
To prevent these kinds of errors we decided to serialize the indexing activity execution - this is how our Indexing activity queue was born. An activity could be executed only if all activities that were created before it were finished.

## The current problem

The algorithm above works quite well in an environment where there is no heavy load on the web servers and there are no long-running activities (e.g. moving or renaming huge workspaces). But still, these activities all block the UI thread, which means the system produced longer-than-expected response times, sometimes even timeouts.

## Solution concept

In the current distributed environment there is only one option: the activities that have no effect on each other should execute in parallel, but the ones that depend on each other still have to be queued and executed one after the other.
Activities depend on each other in the following cases:

-   they are related to the same content (e.g. first we modify a content than rename it)
-   the content items they are related to are in a parent-child relationship (e.g. renaming a folder and uploading a new file into it)

Imagine an office with a couple of windows and many customers arriving in a short time frame. The customers already have their number but they can arrive in a different order. The doorman puts them into a preliminary queue based on their number. The Guide determines whether there is a free window available and whether there are customers that the one who just arrived should wait for. When (for a particular customer) there are no more dependencies, she can get to a free window and arrange her case. When the case is finished, all other customers that were waiting for her will be notified.

[![2016-01-12 - IAQ - administration](../../image.axd?picture "2016-01-12 - IAQ - administration")](../../image.axd?picture)

The example above is not perfect as in Sense/Net ECM the number of windows will vary based on the number of available threads, but you get the idea.

## Work in progress

We are currently in the middle of rewriting our activity queue to fulfill the requirements above. We created a prototype for the algorithm outside of Sense/Net ECM that we can use to test common use cases. Here is an example.


-   there are a couple of tree operations on the same content (move, rename, delete). This results in the **A1-A4** activities you see below. In the diagrams we illustrated this with the same '/R/A' path for the sake of simplicity; the point is these activities should be executed in a serialized way, one after the other.
-   in a completely different subtree somebody uploads 5 documents, than renames their parent folder. This creates the **A5-A11** activities. A5-A9 are independent so they can be executed in parallel, but A10 and A11 have to wait for them.

The execution time of our test activities vary and naturally the 'tree' activities take longer to execute. Here is the dependency list of the activities above:
A2 waits for A1
A3 waits for A1, A2
A4 waits for A1, A2, A3
A10 waits for A5, A6, A7, A8, A9
A11 waits for A5, A6, A7, A8, A9, A10

To simulate a non-deterministic environment, we added the activities to the queue in a different order than they were created.

 | Tables   |      Are      |  Cool |
 |----------|:-------------:|------:|
 | col 1 is |  left-aligned | $1600 |
 | col 2 is |    centered   |   $12 |
 | col 3 is | right-aligned |    $1 |
 
 Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

| Activity | Wait time (msec) | Execution time (msec) | Type | Path |
|-|:-:|-:|-:|-:|
| A1 | 31,2576 | 2015,6672 | AddTreeActivity | /r/a |
| A4 | 5078,1696 | 1015,616 | DeleteTreeActivity | /r/a |
| A2 | 2046,9248 | 1015,5648 | DeleteTreeActivity | /r/a |
| A3 | 3062,4896 | 2015,68 | AddTreeActivity | /r/a |
| A11 | 1609,408 | 2015,5776 | AddTreeActivity | /r/b |
| A10 | 593,7536 | 1015,6544 | DeleteTreeActivity | /r/b |
| A5 | 78,1568 | 515,5968 | AddDocumentActivity | /r/b/b |
| A6 | 78,1568 | 515,5968 | AddDocumentActivity | /r/b/c |
| A7 | 78,1568 | 515,5968 | AddDocumentActivity | /r/b/d |
| A8 | 78,1568 | 515,5968 | AddDocumentActivity | /r/b/e |
| A9 | 78,1568 | 515,5968 | AddDocumentActivity | /r/b/f |

   
Take a look at the diagram of the test execution. X axis shows the elapsed time in milliseconds, Y axis contains the activities as they were added from bottom to top.

[![2016-01-12 - IAQ - execution](../../image.axd?picture "2016-01-12 - IAQ - execution")](../../image.axd?picture)

You can see that in the first subtree there is a strictly serialized execution (A1, A2, A3, A4), without overlap. In the other subtree (where the users uploaded the documents) 5 independent activities are executed almost immediately, than A10 and A11.

In the near future we will integrate the solution into the core product so we can check the performance improvements made possible by the solution.


---
title: "Benchmark behind the scenes"
source_url: 'https://github.com/SenseNet/sensenet/docs/sn-benchmark'
category: Benchmark
version: v7.0.0
tags: [benchmark, theory, sn7]
---
# sensenet ECM benchmark behind the scenes

## Maximum performance detection analysis with a heuristic algorithm

The sensenet ECM server environment reaches its maximum performance (for whatever reason) when the served request count cannot increase, even if the received requests are growing. 
This expectation outlines a prerequisite to the algorithm to work: after having reached the maximum performance, during an increasing load we must see a constant served request per second plateau that follows the increasing phase.


![alt text](/img/benchmark/1-evaluation.png "performance ladder")

The benchmark tool records every second the 
  - active profile count (green)
  - active (unfinished) connections (purple)
  - served requests per second (blue)

and much more data. The trend graph looks like the following:

Two complement behaviours appear on the graph.

  1. The opened connection count is low when the system can serve more requests. When the maximum performance reached the count of waiting requests are steeply raising.
  2. The served (finished) requests per second (req/sec) value is evenly raising to the maximum performance. After that, it is becomes a constant.

The most relevant parameter is the served requests. It is a very noisy graph but easy to recognise the growing and constant phases.

![alt text](/img/benchmark/2-req-sec.png "served requests closeup")

End point detection with rulers: draw a line over the estimated average of the growing phase, and another one over the constant phase. The intersection of the two line is the measuring endpoint. This point signs the limit of the tested system. After this point the benchmark sofware can increase the load only in vain.

![alt text](/img/benchmark/3-req-sec-lines.png "endpoint recognition")

In the algorithmic version the benchmark tool uses a noise filter on the req/sec (blue line), and makes the (also noise filtered) differential function (red). 

![alt text](/img/benchmark/4-avg-diff.png "noise filtering and differential function")

The graph of the differential function indicates the direction of the main function changes in every point. When the growing stops, the differential function goes through zero from the positive values. At this point the benchmark measuring result is the value of the active profile count (190 in this case).

![alt text](/img/benchmark/5-avg-diff-trigger.png "all of them put together")

Color codes on all graphs:
  - green: number of parallel profiles.
  - blue: served requests per sec (req/sec) or its average.
  - purple: active requests.
  - red: average differential req/sec .

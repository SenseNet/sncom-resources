---
title: "Benchmark measuring"
source_url: 'https://github.com/SenseNet/sn-benchmark/blob/master/docs/measuring.md'
category: Benchmark
version: v7.0.0
tags: [benchmark, measuring, workflow, sn7]
description: This page discusses the sensenet ECM Benchmark Tool measuring process.
---
# Benchmark measuring
This page discusses the sensenet ECM Benchmark Tool measuring process. Further information about the needed environment or the measuring profiles are at the following pages:
 - [Environment preparation](/docs/environment.md)
 - [Profiles](/docs/profile-definition-language.md)
## Steps before measuring
  - Make sure you have a clean database and prepared for measuring
  - Check that LuceneIndex is in sync on all sites
  - On the benchmark servers all sites but the measuring must be stopped
  - Check benchmark output directory: ..\BenchmarkTool\bin\Output
  - Start the measuring appools and sites
## Measuring
  Execute the benchmark tool:  
	```
	..BenchmarkTool\bin\SnBenchmark.exe -GROW:30 -ERRORS:10 -WARMUP:30 -SITE:"http://somehost.com,http://site01.com" -USR:admin -PWD:admin
	```  
Further explanation on parameters is in the [benchmark details documentation](/docs/benchmark-details.md).
If you would like reliable results, you should repeat it some 2-5 times. Between the iterations it is recommended to wait for your webservers to free the allocated resources.
## Steps after measuring
The measuring makes .csv files from the measured data, but if there were errors .error files are also generated.
You should take the result into account only if there were not any errors during measuring. Thankfully the value list is in .csv files, so you can use any spreadsheet handling software to evaluate the results easily.

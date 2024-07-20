
//CPU 사용률
{"dash_type":"tgraph","config":{"display_tgraph":{"axis_x":{"label":"time(s)","min":0,"max":60,"sample_count":60},"axis_y":{"label":"usage(%)","min":0,"max":100},"graph":[{"key":"/sysinfo/[cpu]/title","key_value":"CPU0","legend":"CPU 1","color":"blue","alarm_color":"red","auto_axis_x":1,"alarm_level":80,"data_y":"/sysinfo/[cpu]/usage"},{"key":"/sysinfo/[cpu]/title","key_value":"CPU1","legend":"CPU 2","color":"green","alarm_color":"magenta","auto_axis_x":1,"alarm_level":85,"data_y":"/sysinfo/[cpu]/usage"}]},"data_tgraph":{"type":"websocket","uri":"/dt/site/01/facility/server/01"}}}


//DISK 사용률
{"dash_type":"bgraph","config":{"display_bgraph":{"axis_x":{"label":"DISKs"},"axis_y":{"label":"usage(%)","min":0,"max":100},"graph":[{"key":"/sysinfo/[disk]/title","key_value":"HDD0","legend":"DISK 1","color":"blue","alarm_color":"red","auto_axis_x":1,"alarm_level":80,"data_y":"/sysinfo/[disk]/usage"},{"key":"/sysinfo/[disk]/title","key_value":"HDD1","legend":"DISK 2","color":"green","alarm_color":"magenta","auto_axis_x":1,"alarm_level":85,"data_y":"/sysinfo/[disk]/usage"}]},"data_bgraph":{"type":"websocket","uri":"/dt/site/01/facility/server/01"}}}


//RAM 사용률
{"dash_type":"tgraph","config":{"display_tgraph":{"axis_x":{"label":"time(s)","min":0,"max":60,"sample_count":60},"axis_y":{"label":"usage(%)","min":0,"max":100},"graph":[{"legend":"RAM","key":"/sysinfo/ram/title","key_value":"RAM0","color":"blue","alarm_color":"red","auto_axis_x":1,"alarm_level":80,"data_y":"/sysinfo/ram/usage"}]}}}

//ConnectNulls
//DashedLineChart
//PieChartWithPaddingAngle
//TableScroll
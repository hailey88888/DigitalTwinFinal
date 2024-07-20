

export const trendG = [
    {"axis_x" : ["label","min","max","sample_count"]},
    {"axis_y" : ["label","min","max"]},
    {"graph" : ["legend","color","alarm_color","auto_axis_x","data_item","alarm_level"]},
]


export const barG = [
    {"axis_x" : ["label"]},
    {"axis_y" : ["label","min","max"]},
    {"graph" : ["legend","color","alarm_color","order","data_item","alarm_level"]},
]


// {"dash_type":"tgraph","config":{"display_tgraph":{"axis_x":{"label":"time(s)","min":0,"max":60,"sample_count":60},"axis_y":{"label":"usage(%)","min":0,"max":100},"graph":[{"key":"/sysinfo/[cpu]/title","key_value":"CPU0","legend":"CPU 1","color":"blue","alarm_color":"red","auto_axis_x":1,"alarm_level":80,"data_y":"/sysinfo/[cpu]/usage"},{"key":"/sysinfo/[cpu]/title","key_value":"CPU1","legend":"CPU 2","color":"green","alarm_color":"magenta","auto_axis_x":1,"alarm_level":85,"data_y":"/sysinfo/[cpu]/usage"}]},"data_tgraph":{"type":"websocket","uri":"/dt/site/01/facility/server/01"}}}
// {"dash_type":"bgraph","config":{"display_bgraph":{"axis_x":{"label":"DISKs"},"axis_y":{"label":"usage(%)","min":0,"max":100},"graph":[{"key":"/sysinfo/[disk]/title","key_value":"HDD0","legend":"DISK 1","color":"blue","alarm_color":"red","auto_axis_x":1,"alarm_level":80,"data_y":"/sysinfo/[disk]/usage"},{"key":"/sysinfo/[disk]/title","key_value":"HDD1","legend":"DISK 2","color":"green","alarm_color":"magenta","auto_axis_x":1,"alarm_level":85,"data_y":"/sysinfo/[disk]/usage"}]},"data_bgraph":{"type":"websocket","uri":"/dt/site/01/facility/server/01"}}}

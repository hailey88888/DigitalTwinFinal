{  
    "title":"site1 simulation slow",
    "repeat":10,	 
    "timelaps":
    [	   
      { 
        "timestamp":0,
        "interval":600,
        "repeat":5,
        "datas":
        [	  
          {
            "topic":"/dt/site/1/facility/line1",
            "component": 
            [
              {
                "name":"IRB1200_1",
                "timelaps":600,
                "parts":
                [
                  {"name":"irb1200_axis1","data":[{"data_name":"angle" , "nvalue":36, "svalue":"36"},{"data_name":"temperature" , "nvalue":24, "svalue":"24"}]},
                  {"name":"irb1200_axis2","data":[{"data_name":"angle" , "nvalue":-18, "svalue":"-18"},{"data_name":"temperature" , "nvalue":24, "svalue":"24"}]},
                  {"name":"irb1200_axis3","data":[{"data_name":"angle" , "nvalue":22, "svalue":"22"},{"data_name":"temperature" , "nvalue":24, "svalue":"24"}]},
                  {"name":"irb1200_axis4","data":[{"data_name":"angle" , "nvalue":18, "svalue":"18"},{"data_name":"temperature" , "nvalue":24, "svalue":"24"}]},
                  {"name":"irb1200_axis5","data":[{"data_name":"angle" , "nvalue":6, "svalue":"6"},{"data_name":"temperature" , "nvalue":24, "svalue":"24"}]},
                  {"name":"irb1200_axis6","data":[{"data_name":"angle" , "nvalue":18, "svalue":"18"},{"data_name":"temperature" , "nvalue":24, "svalue":"24"}]}		 
                ]
              }
            ]
          }
        ]
      },
      { 
        "timestamp":5000,
        "interval":600,
        "repeat":5,
        "datas":
        [	  
          {
            "topic":"/dt/site/1/facility/line1",
            "component": 
            [
              {
                "name":"IRB1200_1",
                "timelaps":600,
                "parts":
                [
                  {"name":"irb1200_axis1","data":[{"data_name":"angle" , "nvalue":-36, "svalue":"-36"},{"data_name":"temperature" , "nvalue":24, "svalue":"24"}]},
                  {"name":"irb1200_axis2","data":[{"data_name":"angle" , "nvalue":18, "svalue":"18"},{"data_name":"temperature" , "nvalue":24, "svalue":"24"}]},
                  {"name":"irb1200_axis3","data":[{"data_name":"angle" , "nvalue":-22, "svalue":"-2"},{"data_name":"temperature" , "nvalue":24, "svalue":"24"}]},
                  {"name":"irb1200_axis4","data":[{"data_name":"angle" , "nvalue":-18, "svalue":"-18"},{"data_name":"temperature" , "nvalue":24, "svalue":"24"}]},
                  {"name":"irb1200_axis5","data":[{"data_name":"angle" , "nvalue":-6, "svalue":"-6"},{"data_name":"temperature" , "nvalue":24, "svalue":"24"}]},
                  {"name":"irb1200_axis6","data":[{"data_name":"angle" , "nvalue":-18, "svalue":"-18"},{"data_name":"temperature" , "nvalue":24, "svalue":"24"}]}		 
                ]
              }
            ]
          }
        ]
      }	
    ]
  }
  
import { tokens } from "../../theme";
import {useTheme} from "@mui/material";

//Table과 Search박스를 감싸는 부분
export const TableSearchBox = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const css = {
    // display: 'flex',
    "& .MuiDataGrid-root": {
      border: "none",
    },
    "& .MuiDataGrid-cell": {
      border: "none",
    },
    "& .name-column--cell": {
      color: '#FF7F00',
    },

    // 테이블 row 색상
    "& .row" : {
      backgroundColor: "#1a1a1a"
    },

 

    // 테이블 헤더 색상
    // "& .MuiDataGrid-columnHeaders": {
    //   backgroundColor: '#151632',
    //   borderBottom: "none",
    // },

     "& .MuiDataGrid-row": {
      backgroundColor: '#1f1e1e',
    },

    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: colors.primary[400],
    },
    // "& .MuiDataGrid-footerContainer": {
    //   borderTop: "none",
    //   backgroundColor: colors.blueAccent[700],
    // },
    "& .MuiCheckbox-root": {
      color: '#6798bf !important',
    },
    "& .MuiDataGrid-iconSeparator": {
      color: colors.primary[100],
    },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
      color: `${colors.gray[100]} !important`,
    },
  }
  return css;
}









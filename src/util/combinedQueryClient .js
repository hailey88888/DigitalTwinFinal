import { siteQueryClient } from "./restAPI/masterUser/site";
import { authQueryClient } from "./restAPI/common/auth";
import { dashboardQueryClient } from "./restAPI/masterUser/dashboard";
import { dshboardCodeQueryClient } from "./restAPI/masterUser/dshboardCode";
import { userQueryClient } from "./restAPI/siteAdmin/user";
import { QueryClient } from "@tanstack/react-query";
import { dashboardCodeClient } from "./restAPI/siteAdmin/dashboardCode";
import { dashboardClient } from "./restAPI/siteAdmin/dashboard";
import { dashboardItemClient } from "./restAPI/siteAdmin/dashITEM";

const combinedQueryClient = new QueryClient();

combinedQueryClient.setDefaultOptions(siteQueryClient);
combinedQueryClient.setDefaultOptions(authQueryClient);
combinedQueryClient.setDefaultOptions(dashboardQueryClient);
combinedQueryClient.setDefaultOptions(dshboardCodeQueryClient);
combinedQueryClient.setDefaultOptions(userQueryClient);
combinedQueryClient.setDefaultOptions(dashboardCodeClient);
combinedQueryClient.setDefaultOptions(dashboardClient);
combinedQueryClient.setDefaultOptions(dashboardItemClient);



export default combinedQueryClient;

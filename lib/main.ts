#!/usr/bin/env node

import { ReadParametersService } from "./ui/reader/read-parameters.service";
import { CliAppService } from "./app-service/cli-app.service";

/*
    Here the application (CLI) starts.
*/
const readParameters = new ReadParametersService();
new CliAppService(readParameters).run();

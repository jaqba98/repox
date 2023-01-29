#!/usr/bin/env node

import "core-js/features/reflect";
import { container } from "tsyringe";
import { CliAppService } from "./app-service/cli-app.service";

/*
    Here the application (CLI) starts.
*/
container.resolve(CliAppService).run();

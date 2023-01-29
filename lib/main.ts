#!/usr/bin/env node

import "reflect-metadata";
import { container } from "tsyringe";
import { CliAppService } from "./app-service/cli-app.service";

/*
    Here the application (CLI) starts.
*/
container.resolve(CliAppService).run();

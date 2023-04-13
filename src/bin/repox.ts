#!/usr/bin/env node

import "core-js/features/reflect";
import { container } from "tsyringe";
import { MainService } from "../main/main.service";

container.resolve(MainService).run();
// todo: fix it
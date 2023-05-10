#!/usr/bin/env node

import "core-js/features/reflect";
import { container } from "tsyringe";
import { MainService } from "@lib/main";

container.resolve(MainService).run();

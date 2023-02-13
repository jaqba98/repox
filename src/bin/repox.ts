#!/usr/bin/env node

import "core-js/features/reflect";
import { container } from "tsyringe";
import { MainService } from "../main/main.service";

/**
 * Lightweight monorepo for many huge projects.
 */

container.resolve(MainService).run();

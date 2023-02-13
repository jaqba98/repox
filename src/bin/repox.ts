#!/usr/bin/env node

import { container } from "tsyringe";
import { MainService } from "../main/main.service";

/**
 * Lightweight monorepo for many huge projects.
 */

container.resolve(MainService).run();

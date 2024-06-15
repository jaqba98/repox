import { InjectionToken, singleton } from "tsyringe";

@singleton()
export class LauncherAppService {
  run<T>(aaa: InjectionToken<T>[]) {
    console.log("Hello launcher");
  }
}


/**
 * The base get param dependency for each project.
 */
export interface BaseGetParamDepModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDependency: (program: string) => any;
}

// todo: refactor the code

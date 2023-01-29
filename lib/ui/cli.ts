export class Cli {
    run(): void {
        const args = this.getArgs();
        console.log(args);
    }

    private getArgs(): string[] {
        return process.argv;
    }
}

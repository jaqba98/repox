export class ReadParametersService {
    read(): Array<string> {
        return process.argv;
    }
}

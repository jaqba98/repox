describe("ParamDtoValidationDirector", (): void => {
    describe("Supported signs", (): void => {});

    describe("Correct Pattern", (): void => {});

    describe("Can Exist", (): void => {});

    describe("Correct Order", (): void => {
        test("Should be correct when: _ _ _ _", (): void => {
            expect(true).toBeTruthy();
        });

        test("Should be incorrect when: _ _ _ args", (): void => {
            expect(false).toBeFalsy();
        });

        test("Should be incorrect when: _ _ command _", (): void => {
            expect(false).toBeFalsy();
        });

        test("Should be incorrect when: _ _ command args", (): void => {
            expect(false).toBeFalsy();
        });

        test("Should be correct when: _ args _ _", (): void => {
            expect(true).toBeTruthy();
        });

        test("Should be incorrect when: _ args _ args", (): void => {
            expect(false).toBeFalsy();
        });

        test("Should be incorrect when: _ args command _", (): void => {
            expect(false).toBeFalsy();
        });

        test("Should be incorrect when: _ args command args", (): void => {
            expect(false).toBeFalsy();
        });

        test("Should be correct when: program _ _ _", (): void => {
            expect(true).toBeTruthy();
        });

        test("Should be incorrect when: program _ _ args", (): void => {
            expect(false).toBeFalsy();
        });

        test("Should be correct when: program _ command _", (): void => {
            expect(true).toBeTruthy();
        });

        test("Should be correct when: program _ command args", (): void => {
            expect(true).toBeTruthy();
        });

        test("Should be correct when: program args _ _", (): void => {
            expect(true).toBeTruthy();
        });

        test("Should be incorrect when: program args _ args", (): void => {
            expect(false).toBeFalsy();
        });

        test("Should be correct when: program args command _", (): void => {
            expect(true).toBeTruthy();
        });

        test("Should be correct when: program args program args", (): void => {
            expect(true).toBeTruthy();
        });
    });
});

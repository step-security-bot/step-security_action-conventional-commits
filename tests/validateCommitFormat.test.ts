import { validateCommitFormat } from "../src/index";

describe("validateCommitFormat", () => {
    describe("valid conventional commit formats", () => {
        it("accepts a basic type with description", () => {
            expect(validateCommitFormat("fix: resolve null pointer on startup")).toBe(true);
        });

        it("accepts a commit with a scope", () => {
            expect(validateCommitFormat("feat(auth): add OAuth2 login support")).toBe(true);
        });

        it("accepts a breaking change using bang notation", () => {
            expect(validateCommitFormat("feat!: drop support for Node 14")).toBe(true);
        });

        it("accepts a breaking change with scope and bang", () => {
            expect(validateCommitFormat("refactor(api)!: rename user endpoints")).toBe(true);
        });

        it("accepts a commit prefixed with an emoji", () => {
            expect(validateCommitFormat("🚧 chore: update dependency versions")).toBe(true);
        });

        it("accepts emoji prefix with scope", () => {
            expect(validateCommitFormat("🚧 docs(readme): update installation steps")).toBe(true);
        });

        it("accepts chore type with scope", () => {
            expect(validateCommitFormat("chore(release): bump version to 2.0.0")).toBe(true);
        });
    });

    describe("auto-generated commit messages", () => {
        it("allows git merge commits", () => {
            expect(validateCommitFormat("Merge branch 'main' into feature/new-ui")).toBe(true);
        });

        it("allows git revert commits", () => {
            expect(validateCommitFormat("Revert \"feat: add new dashboard\"")).toBe(true);
        });

        it("allows reapply commits", () => {
            expect(validateCommitFormat("Reapply changes from feature branch")).toBe(true);
        });

        it("allows initial plan commits", () => {
            expect(validateCommitFormat("Initial plan for the new payment module")).toBe(true);
        });
    });

    describe("invalid commit formats", () => {
        it("rejects a message with an unknown type", () => {
            expect(validateCommitFormat("bugfix: resolve null pointer on startup")).toBe(false);
        });

        it("rejects a plain sentence with no type prefix", () => {
            expect(validateCommitFormat("fixed a bug in the login page")).toBe(false);
        });

        it("rejects emoji prefix with unknown type", () => {
            expect(validateCommitFormat("🚧 enhancement: something")).toBe(false);
        });

        it("rejects a misspelled type", () => {
            expect(validateCommitFormat("fixs: typo in button label")).toBe(false);
        });
    });

    describe("custom allowed types", () => {
        it("accepts a type that is in the custom list", () => {
            expect(validateCommitFormat("hotfix: critical patch", ["hotfix", "patch"])).toBe(true);
        });

        it("rejects a standard type not in the custom list", () => {
            expect(validateCommitFormat("feat: new feature", ["hotfix"])).toBe(false);
        });
    });
});

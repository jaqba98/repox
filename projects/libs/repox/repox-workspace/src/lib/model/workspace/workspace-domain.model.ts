/**
 * The domain model uses by the system to work with workspace files.
 */

export interface WorkspaceDomainModel {
    gitignoreTextDomain: string;
    npmRcTextDomain: string;
    readmeMdTextDomain: string;
}

export interface WorkspaceDomainPartialModel extends Partial<WorkspaceDomainModel> {}

import { TestCaseInfo } from './TestCaseInfo';

export class EvaluationGetById {
  submissionDateTime: string;
  status: string;
  lang: string;
  problemId: string;
  problemName: string;
  verdict: string;
  id: string;
  testCasesStatus?: TestCaseInfo[];
  user: string;
  userEmail: string;
}

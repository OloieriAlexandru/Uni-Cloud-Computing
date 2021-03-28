export class EvaluationCreate {
  problemId: string;
  programmingLanguage: string;
  sourceCode: string;

  constructor(problemId: string) {
    this.problemId = problemId;
    this.programmingLanguage = 'C++';
  }
}

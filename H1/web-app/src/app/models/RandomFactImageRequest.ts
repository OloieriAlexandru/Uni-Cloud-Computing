export class RandomFactImageRequest {
  url: String;
  fact: String;

  constructor(url: String, fact: String) {
    this.url = url;
    this.fact = fact;
  }
}

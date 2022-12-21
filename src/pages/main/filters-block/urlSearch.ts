export class UrlSearch {
  params: URLSearchParams;

  constructor() {
    this.params = new URLSearchParams(window.location.search);
  }

  updateUrl() {
    window.history.pushState({}, '', `?${this.params.toString()}`);
  }

  appendParam(key: string, value: string) {
    this.params.append(key, value);
    this.updateUrl()
  }

  setParam(key: string, value: string) {
    this.params.set(key, value);
    if(this.params.getAll(key)[0].length === 0) {
        this.removeParam(key)
    } 
    this.updateUrl()
  }

  getAll(name: string) {
    for (const name of this.params.keys()) {
        console.log(name);
    }
    return this.params.getAll(name);
  }

  removeParam(name: string) {
    this.params.delete(name);
    this.updateUrl()
  }
}

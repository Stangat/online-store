export class UrlSearch {
  params: URLSearchParams;

  constructor() {
    this.params = new URLSearchParams(window.location.search);
  }

  updateUrl() {
    window.history.pushState({}, '', `?${this.params.toString()}`);
  }

  appendParam(key: string, value: string) {
    const curentFiltersByKeys = this.getAll(key)[0]?.split('&') || []
    if(this.params.has(key)) {
      if(curentFiltersByKeys.includes(value)) {
        return
      }
      curentFiltersByKeys.push(value)
      this.removeKey(key)
      this.setParam(key, curentFiltersByKeys.join('&'))
    } else {
      this.params.append(key, value);
    }
    this.updateUrl()
  }

  removeParamByKeyAndValue(key: string, value: string) {
    let curentFiltersByKeys = this.getAll(key)[0].split('&') || []
    if(this.params.has(key) && curentFiltersByKeys.includes(value)) {
      curentFiltersByKeys = curentFiltersByKeys.filter(item => item !== value)
      this.removeKey(key)
      this.setParam(key, curentFiltersByKeys.join('&'))
      this.updateUrl()
    }
  }


  setParam(key: string, value: string) {
    this.params.set(key, value);
    if(this.params.getAll(key)[0].length === 0) {
        this.removeKey(key)
    } 
    this.updateUrl()
  }

  getAll(name: string) {
    return this.params.getAll(name);
  }

  removeKey(name: string) {
    this.params.delete(name);
    this.updateUrl()
  }
}

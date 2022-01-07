export enum Lang {
  Zh = "zh",
  En = "en",
}

class I18n {
  public currentLang = Lang.Zh;
  public currentLangData: any = {};

  public async init() {
    return import(`./data/${this.currentLang}.json`).then((data: any) => {
      this.currentLangData = data;
    });
  }

  public t(key: string) {
    return this.currentLangData[key];
  }
}

const instance = new I18n();
instance.init();
export default instance;

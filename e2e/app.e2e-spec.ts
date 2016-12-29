import { AngularchatPage } from './app.po';

describe('angularchat App', function() {
  let page: AngularchatPage;

  beforeEach(() => {
    page = new AngularchatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

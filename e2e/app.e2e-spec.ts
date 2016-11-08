import { Aibt2Page } from './app.po';

describe('aibt2 App', function() {
  let page: Aibt2Page;

  beforeEach(() => {
    page = new Aibt2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

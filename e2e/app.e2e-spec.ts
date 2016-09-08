import { LifeixFootballH5Page } from './app.po';

describe('lifeix-football-h5 App', function() {
  let page: LifeixFootballH5Page;

  beforeEach(() => {
    page = new LifeixFootballH5Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

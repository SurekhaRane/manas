define(['underscore', 'spec/javascripts/fixtures/json/flats'], function(_, flats) {
  return describe('apartment selectors filters', function() {
    return it('must have 10 records', function() {
      return expect(_.size(flats)).toBe(1);
    });
  });
});

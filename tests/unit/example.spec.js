describe('Example Component', () => { 

  test('Debe de ser mayor a 10', () => {
     // arrange (arreglar)
      let value = 10;

      // act (estimulo / actuar)
      value = value + 2;

      // assert / observar el resultado
      expect(value).toBeGreaterThan(10);
  })

 })
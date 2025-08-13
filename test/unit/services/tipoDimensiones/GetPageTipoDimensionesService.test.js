
import GetPageTipoDimensionesService from '../../../../src/services/tipoDimensiones/GetPageTipoDimensionesService.js';

describe('GetPageTipoDimensionesService', () => {
  let getPageTipoDimensionesService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getPage: jest.fn(),
    };
    getPageTipoDimensionesService = new GetPageTipoDimensionesService(mockRepository);
    process.env.DEFAULT_REG_POR_PAGINA = 10; // Set a default for testing
  });

  afterEach(() => {
    delete process.env.DEFAULT_REG_POR_PAGINA;
  });

  it('should return a page of tipo dimensiones', async () => {
    const mockRows = [{ id: 1 }, { id: 2 }];
    const mockCount = 20;
    mockRepository.getPage.mockResolvedValue({ rows: mockRows, count: mockCount });

    const result = await getPageTipoDimensionesService.execute(1, 10);

    expect(mockRepository.getPage).toHaveBeenCalledWith(0, 10, [['nombre', 'ASC']], true);
    expect(result).toEqual({ rows: mockRows, count: mockCount, totPag: 2 });
  });

  it('should use default limit if not provided', async () => {
    const mockRows = [{ id: 1 }, { id: 2 }];
    const mockCount = 20;
    mockRepository.getPage.mockResolvedValue({ rows: mockRows, count: mockCount });

    const result = await getPageTipoDimensionesService.execute(1);

    expect(mockRepository.getPage).toHaveBeenCalledWith(0, 10, [['nombre', 'ASC']], true);
    expect(result).toEqual({ rows: mockRows, count: mockCount, totPag: 2 });
  });

  it('should calculate total pages correctly for partial pages', async () => {
    const mockRows = [{ id: 1 }];
    const mockCount = 15;
    mockRepository.getPage.mockResolvedValue({ rows: mockRows, count: mockCount });

    const result = await getPageTipoDimensionesService.execute(2, 10);

    expect(mockRepository.getPage).toHaveBeenCalledWith(10, 10, [['nombre', 'ASC']], true);
    expect(result).toEqual({ rows: mockRows, count: mockCount, totPag: 2 });
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new GetPageTipoDimensionesService()).toThrow('El repositorio es requerido');
  });
});

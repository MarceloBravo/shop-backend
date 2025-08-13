
import GetPageTallaNumeroProductoService from '../../../../src/services/tallaNumeroProducto/GetPageTallaNumeroProductoService.js';

describe('GetPageTallaNumeroProductoService', () => {
  let getPageTallaNumeroProductoService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getPage: jest.fn(),
    };
    getPageTallaNumeroProductoService = new GetPageTallaNumeroProductoService(mockRepository);
    process.env.DEFAULT_REG_POR_PAGINA = 10; // Set a default for testing
  });

  afterEach(() => {
    delete process.env.DEFAULT_REG_POR_PAGINA;
  });

  it('should return a page of talla numero producto associations', async () => {
    const mockRows = [{ id: 1 }, { id: 2 }];
    const mockCount = 20;
    mockRepository.getPage.mockResolvedValue({ rows: mockRows, count: mockCount });

    const result = await getPageTallaNumeroProductoService.execute(1, 10);

    expect(mockRepository.getPage).toHaveBeenCalledWith(0, 10, true);
    expect(result).toEqual({ rows: mockRows, count: mockCount, totPag: 2 });
  });

  it('should use default limit if not provided', async () => {
    const mockRows = [{ id: 1 }, { id: 2 }];
    const mockCount = 20;
    mockRepository.getPage.mockResolvedValue({ rows: mockRows, count: mockCount });

    const result = await getPageTallaNumeroProductoService.execute(1);

    expect(mockRepository.getPage).toHaveBeenCalledWith(0, 10, true);
    expect(result).toEqual({ rows: mockRows, count: mockCount, totPag: 2 });
  });

  it('should calculate total pages correctly for partial pages', async () => {
    const mockRows = [{ id: 1 }];
    const mockCount = 15;
    mockRepository.getPage.mockResolvedValue({ rows: mockRows, count: mockCount });

    const result = await getPageTallaNumeroProductoService.execute(2, 10);

    expect(mockRepository.getPage).toHaveBeenCalledWith(10, 10, true);
    expect(result).toEqual({ rows: mockRows, count: mockCount, totPag: 2 });
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new GetPageTallaNumeroProductoService()).toThrow('El repositorio es requerido');
  });
});

import * as xlsx from "xlsx";

interface ExcelRow {
  [key: string]: string | number | boolean;
}

interface ExcelColumn {
  [key: string]: string | number | boolean;
}

export class ExcelUtils {
  
  static readExcel(filePath: string, sheetName: string): ExcelRow[] {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    const rows: ExcelRow[] = xlsx.utils.sheet_to_json(worksheet);

    return rows;
  }

  static writeExcel(
    filePath: string,
    sheetName: string,
    rows: ExcelRow[]
  ): void {
    const worksheet = xlsx.utils.json_to_sheet(rows);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
    xlsx.writeFile(workbook, filePath);
  }

  static getColumList(filePath: string, sheetName: string): ExcelColumn[] {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const columnNames: any = data[0];
    return columnNames;
  }

  static readGroup(filePath: string, sheetName: string): any[] {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(worksheet);
  }
  

  static getBookList(
    filePath: string,
    sheetName: string,
    titleName: string
  ): string[] {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    let arrProduct: string[] = [];
    var count = 0;
    for (let row1 = 1; ; row1++) {
      const cell = worksheet["A" + row1];
      if (!cell) continue;
      const value = cell.v;
      if (value.indexOf(titleName) >= 0) {
        for (let row = row1 + 1; ; row++) {
          let cell1 = worksheet["A" + row];
          if (!cell1) break;
          arrProduct.push(cell1.v);
          count = count + 1;
        }
        break;
      }
    }
    return arrProduct;
  }

  static getProductList(
    filePath: string,
    sheetName: string,
    categoryName: string
  ): any[][] {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    let arrProduct: any[][] = [];
    var count = 0;
    for (let row1 = 1; ; row1++) {
      const cell = worksheet["A" + row1];
      if (!cell) continue;
      const value = cell.v;
      if (value.indexOf(categoryName) >= 0) {
        for (let row = row1 + 1; ; row++) {
          let cell1 = worksheet["A" + row];
          let cell2 = worksheet["B" + row];
          if (!cell1) break;
          arrProduct.push([cell1.v, cell2.v]);
          count = count + 1;
        }
        break;
      }
    }
    return arrProduct;
  }
}

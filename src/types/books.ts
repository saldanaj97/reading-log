type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  completed: boolean;
  purchased: boolean;
  startedAt: Date | undefined;
  finishedAt: Date | undefined;
};

type NewBook = {
  title: string;
  author: string;
  id: string;
  etag: string;
};

type OwnedBooks = {
  id: number;
  userId: number;
  bookId: number;
  createdAt: Date;
  updatedAt: Date;
};

type BookInfo = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: { type: string; identifier: string }[][];
    readingModes: { text: boolean; image: boolean };
    pageCount: number;
    printedPageCount: number;
    printType: string;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
  layerInfo: {
    layers: { layerId: string; volumeAnnotationsVersion: string }[];
  }[];
  saleInfo: {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice: { amount: number; currencyCode: string };
    retailPrice: { amount: number; currencyCode: string };
    buyLink: string;
    offers: {
      finskyOfferType: number;
      listPrice: { amountInMicros: number; currencyCode: string };
    }[][];
  };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: { isAvailable: boolean; acsTokenLink: string };
    pdf: { isAvailable: boolean };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
};

type GoogleBooksApiResponse = {
  id: string;
  selfLink: string;
};

export type { Book, BookInfo, GoogleBooksApiResponse, NewBook, OwnedBooks };

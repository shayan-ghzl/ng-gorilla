import { Injectable } from '@angular/core';
import { EXAMPLE_COMPONENTS } from '@angular/shayan-documents';

export interface LiveExample {
  /** Title of the example. */
  title: string;
  /** Name of the example component. */
  componentName: string;
  /** Selector to match the component of this example. */
  selector: string;
  /** Name of the primary file of this example. */
  primaryFile: string;
  /** List of files which are part of the example. */
  files: string[];
  /** Path to the directory containing the example. */
  packagePath: string;
  /** List of additional components which are part of the example. */
  additionalComponents: string[];
  /** Path from which to import the xample. */
  importPath: string;
}

export interface AdditionalApiDoc {
  name: string;
  path: string;
}

export interface ExampleSpecs {
  prefix: string;
  exclude?: string[];
}

export interface DocItem {
  /** Id of the doc item. Used in the URL for linking to the doc. */
  id: string;
  /** Display name of the doc item. */
  name: string;
  /** Short summary of the doc item. */
  summary?: string;
  /** Package which contains the doc item. */
  packageName?: string;
  /** Specifications for which examples to be load. */
  exampleSpecs: ExampleSpecs;
  /** List of examples. */
  examples?: string[];
  /** Optional id of the API document file. */
  apiDocId?: string;
  /** Optional path to the overview file of this doc item. */
  overviewPath?: string;
  /** List of additional API docs. */
  additionalApiDocs?: AdditionalApiDoc[];
}

export interface DocSection {
  name: string;
  summary: string;
}

const exampleNames = Object.keys(EXAMPLE_COMPONENTS);

const COMPONENTS = 'components';

export const SECTIONS: { [key: string]: DocSection; } = {
  [COMPONENTS]: {
    name: 'Components',
    summary: 'Angular Material offers a wide variety of UI components based on the <a' +
      ' href="https://material.io/components">Material Design specification</a>'
  }
};

const DOCS: { [key: string]: DocItem[]; } = {
  [COMPONENTS]: [
    {
      id: 'file-input',
      name: 'File Input',
      summary: 'File input component to be used within a Form field.',
      exampleSpecs: {
        prefix: 'file-input-',
      },
      overviewPath: '',
      additionalApiDocs: [{ name: 'Testing', path: 'material-file-input.html' }],
    },
  ]
  // TODO(jelbourn): re-add utilities and a11y as top-level categories once we can generate
  // their API docs with dgeni. Currently our setup doesn't generate API docs for constants
  // and standalone functions (much of the utilities) and we have no way of generating API
  // docs more granularly than directory-level (within a11y) (same for viewport).
};

const ALL_DOCS = processDocs(DOCS[COMPONENTS]);

@Injectable({ providedIn: 'root' })
export class DocumentationItems {

  getItems(section: string): DocItem[] {
    if (section === COMPONENTS) {
      return ALL_DOCS;
    }
    return [];
  }

  getItemById(id: string): DocItem | undefined {
    return ALL_DOCS.find(doc => doc.id === id);
  }
}

function processDocs(docs: DocItem[]): DocItem[] {
  for (const doc of docs) {
    doc.examples = exampleNames.filter(key =>
      key.match(RegExp(`^${doc.exampleSpecs.prefix}`)) &&
      !doc.exampleSpecs.exclude?.some(excludeName => key.indexOf(excludeName) === 0));
  }

  return docs.sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

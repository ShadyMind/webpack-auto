'use strict';

const { writeFile } = require('node:fs/promises');

(async () => {
  const resp = await fetch('https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry');
  const text = await resp.text();

  const langs = text.split('\n%%\n');

  const types = langs.reduce((acc, lang) => {
    const langObject = lang.split('\n').reduce((accInner, line) => {
      const [_key, _value] = line.split(/:\s*/);
      const key = typeof _key === 'string' ? _key.trim() : null;
      const value = typeof _value === 'string' ? _value.trim() : null;

      if (key) {
        accInner[key] = value;
      }

      return accInner;
    }, {});

    const typeKey = langObject.Type;

    if (!typeKey) {
      return acc;
    }

    if (typeof acc[typeKey] !== 'string') {
      acc[typeKey] = '';
    }

    if (typeof langObject.Subtag === 'string') {
      acc[typeKey] += `  | '${langObject.Subtag}'`;
    } else if (langObject.Tag === 'string') {
      acc[typeKey] += `  | '${langObject.Tag}'`;
    } else {
      return acc;
    }
    
    if (langObject.Description) {
      acc[typeKey] += ` // ${langObject.Description}`;
    }

    acc[typeKey] += '\n';

    return acc;
  }, {});

  let content = '';

  if (types.language) {
    content += `\nexport type LocaleLanguage =\n${types.language};`;
  }

  if (types.extlang) {
    content += `\nexport type LocaleExtlang =\n${types.extlang};`;
  }

  if (types.script) {
    content += `\nexport type LocaleScript =\n${types.script};`;
  }

  if (types.region) {
    content += `\nexport type LocaleRegion =\n${types.region};`;
  }

  if (types.variant) {
    content += `\nexport type LocaleVariant =\n${types.variant};`;
  }

  if (types.grandfathered) {
    content += `\nexport type LocaleGrandfathered =\n${types.grandfathered};`;
  }

  if (types.redundant) {
    content += `\nexport type LocaleRedundant =\n${types.redundant};`;
  }

  content += '\n';

  await writeFile('./bcp47.ts', content);
})();

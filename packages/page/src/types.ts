type CommonMetaName =
  | 'title'
  | 'keywords'
  | 'description'
  | 'author'
  | 'robots'
  | 'alternate'
  | 'viewport'
  | 'theme-color'
  | 'shortcut icon'
;

type WindowsMetaName = `msapplication-${
  | 'allowDomainApiCalls'
  | 'allowDomainMetaTags'
  | 'badge'
  | 'config'
  | 'navbutton-color'
  | 'notification'
  | 'square150x150logo'
  | 'square310x310logo'
  | 'square70x70logo'
  | 'wide310x150logo'
  | 'starturl'
  | 'task'
  | 'task-separator'
  | 'TileColor'
  | 'TileImage'
  | 'tooltip'
  | 'window'
}` | 'application-name';

type GoogleSearchMetaName = `business:contact_data:${
  | 'locality'
  | 'postal_code'
  | 'country_name'
  | 'email'
  | 'website'
}`;

type TwitterMetaName = `twitter:${
  | 'card'
  | 'title'
  | 'site'
  | 'description'
  | 'domain'
  | 'image'
}`;

type FacebookMetaName = `og:${
  | 'locale'
  | 'type'
  | 'title'
  | 'description'
  | 'url'
  | `article:${
    | 'published_time'
    | 'modified_time'
  }`
  | 'image'
  | `image:${
    | 'width'
    | 'height'
  }`
  | 'site_name'
  | 'see_also'
}`;

type IOSMetaName =
  | `apple-mobile-web-app-${
    | 'title'
    | 'capable'
    | 'status-bar-style'
  }`
  | 'format-detection'
  | 'apple-itunes-app'
;

export type MetaOptions = Partial<
  Record<
      | CommonMetaName
      | GoogleSearchMetaName
      | TwitterMetaName
      | FacebookMetaName
      | WindowsMetaName
      | IOSMetaName
    ,
    string
  >
>;

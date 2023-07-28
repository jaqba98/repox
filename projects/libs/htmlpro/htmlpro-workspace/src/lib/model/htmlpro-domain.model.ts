/**
 * abc
 */

export interface HtmlproComponentDomainModel {
  alias: string;
  templateUrl: string;
  styleUrls: Array<string>;
}

export interface HtmlproComponentsDomainModel {
  [component: string]: HtmlproComponentDomainModel;
}

export interface HtmlproDomainModel {
  components: HtmlproComponentsDomainModel;
}

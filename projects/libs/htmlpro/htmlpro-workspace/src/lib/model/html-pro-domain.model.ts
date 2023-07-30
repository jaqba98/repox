/**
 * abc
 */

export interface HtmProComponentDomainModel {
  alias: string;
  templateUrl: string;
  styleUrls: Array<string>;
}

export interface HtmlProComponentsDomainModel {
  [component: string]: HtmProComponentDomainModel;
}

export interface HtmlProDomainModel {
  components: HtmlProComponentsDomainModel;
}

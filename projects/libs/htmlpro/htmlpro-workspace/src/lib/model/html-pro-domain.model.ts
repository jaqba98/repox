/**
 * The domain model of HtmlPro program.
 */

export interface HtmProComponentDomainModel {
  alias: string
  templateUrl: string
  styleUrls: string[]
}

export type HtmlProComponentsDomainModel = Record<string, HtmProComponentDomainModel>;

export interface HtmlProDomainModel {
  components: HtmlProComponentsDomainModel
}

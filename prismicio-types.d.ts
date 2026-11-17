import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

/**
 * Content for Band Member documents
 */
interface BandMemberDocumentData {
	/**
	 * Name field in *Band Member*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: band_member.name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Instrument / crime field in *Band Member*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: band_member.instrument
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	instrument: prismic.KeyTextField;
	
	/**
	 * Photo field in *Band Member*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: band_member.photo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photo: prismic.ImageField<never>;
	
	/**
	 * Unhinged quote field in *Band Member*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: band_member.quote
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	quote: prismic.RichTextField;
	
	/**
	 * Weird fact field in *Band Member*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: band_member.weird_fact
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	weird_fact: prismic.KeyTextField;
	
	/**
	 * Shake level on hover field in *Band Member*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: unhinged
	 * - **API ID Path**: band_member.shake_level
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	shake_level: prismic.SelectField<"mild" | "unhinged" | "earthquake", "filled">;
}

/**
 * Band Member document from Prismic
 *
 * - **API ID**: `band_member`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BandMemberDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<BandMemberDocumentData>, "band_member", Lang>;

/**
 * Content for Beer documents
 */
interface BeerDocumentData {
	/**
	 * Name field in *Beer*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer.name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Style field in *Beer*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer.style
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	style: prismic.KeyTextField;
	
	/**
	 * ABV (%) field in *Beer*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer.abv
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	abv: prismic.NumberField;
	
	/**
	 * Label (AI slop) field in *Beer*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer.label
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	label: prismic.ImageField<never>;
	
	/**
	 * Tasting notes field in *Beer*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer.tasting_notes
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	tasting_notes: prismic.RichTextField;
	
	/**
	 * Side effects field in *Beer*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer.side_effects
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	side_effects: prismic.RichTextField;
	
	/**
	 * Glow colour field in *Beer*
	 *
	 * - **Field Type**: Color
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer.glow
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/color
	 */
	glow: prismic.ColorField;
}

/**
 * Beer document from Prismic
 *
 * - **API ID**: `beer`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BeerDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<BeerDocumentData>, "beer", Lang>;

/**
 * Content for Gig documents
 */
interface GigDocumentData {
	/**
	 * Venue field in *Gig*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.venue
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	venue: prismic.KeyTextField;
	
	/**
	 * City field in *Gig*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.city
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	city: prismic.KeyTextField;
	
	/**
	 * Date and time field in *Gig*
	 *
	 * - **Field Type**: Timestamp
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.date
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/timestamp
	 */
	date: prismic.TimestampField;
	
	/**
	 * Poster field in *Gig*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.poster
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	poster: prismic.ImageField<never>;
	
	/**
	 * Tickets / info field in *Gig*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.tickets
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	tickets: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Status field in *Gig*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: upcoming
	 * - **API ID Path**: gig.status
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	status: prismic.SelectField<"upcoming" | "played" | "cancelled (hangover)", "filled">;
	
	/**
	 * Notes field in *Gig*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.notes
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	notes: prismic.KeyTextField;
}

/**
 * Gig document from Prismic
 *
 * - **API ID**: `gig`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type GigDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<GigDocumentData>, "gig", Lang>;

type HomepageDocumentDataSlicesSlice = ChaosHeroSlice | BandMembersSlice | BeerCellarSlice | GigListSlice | YeaaapButtonSlice | TheBarSlice | VideoSlice | ManifestoSlice | SlopGallerySlice | MusicSlice

/**
 * Content for Homepage documents
 */
interface HomepageDocumentData {
	/**
	 * Slice Zone field in *Homepage*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: homepage.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: homepage.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Homepage*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomepageDocumentData>, "homepage", Lang>;

type PageDocumentDataSlicesSlice = ChaosHeroSlice | BandMembersSlice | BeerCellarSlice | GigListSlice | YeaaapButtonSlice | TheBarSlice | VideoSlice | ManifestoSlice | SlopGallerySlice | MusicSlice

/**
 * Content for Page documents
 */
interface PageDocumentData {
	/**
	 * Slice Zone field in *Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<PageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

/**
 * Item in *Settings → Scrolling nonsense (marquee)*
 */
export interface SettingsDocumentDataMarqueeItem {
	/**
	 * Text field in *Settings → Scrolling nonsense (marquee)*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.marquee[].text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
}

/**
 * Item in *Settings → Tab titles when the visitor leaves*
 */
export interface SettingsDocumentDataAwayTitlesItem {
	/**
	 * Text field in *Settings → Tab titles when the visitor leaves*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.away_titles[].text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
}

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
	/**
	 * Site title field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.site_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	site_title: prismic.KeyTextField;
	
	/**
	 * Tagline field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.tagline
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	tagline: prismic.KeyTextField;
	
	/**
	 * Navigation field in *Settings*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.navigation
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	navigation: prismic.Repeatable<prismic.LinkField<string, string, unknown, prismic.FieldState, never>>;
	
	/**
	 * Scrolling nonsense (marquee) field in *Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.marquee[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	marquee: prismic.GroupField<Simplify<SettingsDocumentDataMarqueeItem>>;
	
	/**
	 * Tab titles when the visitor leaves field in *Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.away_titles[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	away_titles: prismic.GroupField<Simplify<SettingsDocumentDataAwayTitlesItem>>;
	
	/**
	 * Instagram field in *Settings*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.instagram
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	instagram: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Footer text field in *Settings*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.footer_text
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	footer_text: prismic.RichTextField;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<SettingsDocumentData>, "settings", Lang>;

export type AllDocumentTypes = BandMemberDocument | BeerDocument | GigDocument | HomepageDocument | PageDocument | SettingsDocument;

/**
 * Item in *Band Members → Default → Primary → Members*
 */
export interface BandMembersSliceDefaultPrimaryMembersItem {
	/**
	 * Member field in *Band Members → Default → Primary → Members*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: band_members.default.primary.members[].member
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	member: ContentRelationshipFieldWithData<[{"fields":["name","instrument","photo","quote","weird_fact","shake_level"],"id":"band_member"}]>;
}

/**
 * Primary content in *Band Members → Default → Primary*
 */
export interface BandMembersSliceDefaultPrimary {
	/**
	 * Heading field in *Band Members → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: band_members.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Members field in *Band Members → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: band_members.default.primary.members[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	members: prismic.GroupField<Simplify<BandMembersSliceDefaultPrimaryMembersItem>>;
}

/**
 * Default variation for Band Members Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BandMembersSliceDefault = prismic.SharedSliceVariation<"default", Simplify<BandMembersSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Band Members*
 */
type BandMembersSliceVariation = BandMembersSliceDefault

/**
 * Band Members Shared Slice
 *
 * - **API ID**: `band_members`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BandMembersSlice = prismic.SharedSlice<"band_members", BandMembersSliceVariation>;

/**
 * Item in *Beer Cellar → Default → Primary → Beers*
 */
export interface BeerCellarSliceDefaultPrimaryBeersItem {
	/**
	 * Beer field in *Beer Cellar → Default → Primary → Beers*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer_cellar.default.primary.beers[].beer
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	beer: ContentRelationshipFieldWithData<[{"fields":["name","style","abv","label","tasting_notes","side_effects","glow"],"id":"beer"}]>;
}

/**
 * Primary content in *Beer Cellar → Default → Primary*
 */
export interface BeerCellarSliceDefaultPrimary {
	/**
	 * Heading field in *Beer Cellar → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer_cellar.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Intro field in *Beer Cellar → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer_cellar.default.primary.intro
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	intro: prismic.RichTextField;
	
	/**
	 * Beers field in *Beer Cellar → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer_cellar.default.primary.beers[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	beers: prismic.GroupField<Simplify<BeerCellarSliceDefaultPrimaryBeersItem>>;
}

/**
 * Default variation for Beer Cellar Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BeerCellarSliceDefault = prismic.SharedSliceVariation<"default", Simplify<BeerCellarSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Beer Cellar*
 */
type BeerCellarSliceVariation = BeerCellarSliceDefault

/**
 * Beer Cellar Shared Slice
 *
 * - **API ID**: `beer_cellar`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BeerCellarSlice = prismic.SharedSlice<"beer_cellar", BeerCellarSliceVariation>;

/**
 * Primary content in *Chaos Hero → Default → Primary*
 */
export interface ChaosHeroSliceDefaultPrimary {
	/**
	 * Title field in *Chaos Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: chaos_hero.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Subtitle field in *Chaos Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: chaos_hero.default.primary.subtitle
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	subtitle: prismic.KeyTextField;
	
	/**
	 * Image field in *Chaos Hero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: chaos_hero.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Chaos level field in *Chaos Hero → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: 11
	 * - **API ID Path**: chaos_hero.default.primary.chaos_level
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	chaos_level: prismic.SelectField<"1" | "5" | "11", "filled">;
}

/**
 * Default variation for Chaos Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ChaosHeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ChaosHeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Chaos Hero*
 */
type ChaosHeroSliceVariation = ChaosHeroSliceDefault

/**
 * Chaos Hero Shared Slice
 *
 * - **API ID**: `chaos_hero`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ChaosHeroSlice = prismic.SharedSlice<"chaos_hero", ChaosHeroSliceVariation>;

/**
 * Primary content in *Gig List → Default → Primary*
 */
export interface GigListSliceDefaultPrimary {
	/**
	 * Heading field in *Gig List → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig_list.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Message when there are no gigs field in *Gig List → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig_list.default.primary.empty_message
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	empty_message: prismic.RichTextField;
}

/**
 * Default variation for Gig List Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type GigListSliceDefault = prismic.SharedSliceVariation<"default", Simplify<GigListSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Gig List*
 */
type GigListSliceVariation = GigListSliceDefault

/**
 * Gig List Shared Slice
 *
 * - **API ID**: `gig_list`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type GigListSlice = prismic.SharedSlice<"gig_list", GigListSliceVariation>;

/**
 * Primary content in *Manifesto → Default → Primary*
 */
export interface ManifestoSliceDefaultPrimary {
	/**
	 * Body field in *Manifesto → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: manifesto.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Style field in *Manifesto → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: ransom-note
	 * - **API ID Path**: manifesto.default.primary.style
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	style: prismic.SelectField<"ransom-note" | "typewriter" | "screaming", "filled">;
}

/**
 * Default variation for Manifesto Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ManifestoSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ManifestoSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Manifesto*
 */
type ManifestoSliceVariation = ManifestoSliceDefault

/**
 * Manifesto Shared Slice
 *
 * - **API ID**: `manifesto`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ManifestoSlice = prismic.SharedSlice<"manifesto", ManifestoSliceVariation>;

/**
 * Item in *Music → Default → Primary → Tracks*
 */
export interface MusicSliceDefaultPrimaryTracksItem {
	/**
	 * Title field in *Music → Default → Primary → Tracks*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: music.default.primary.tracks[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Audio file field in *Music → Default → Primary → Tracks*
	 *
	 * - **Field Type**: Link to Media
	 * - **Placeholder**: *None*
	 * - **API ID Path**: music.default.primary.tracks[].audio
	 * - **Documentation**: https://prismic.io/docs/fields/link-to-media
	 */
	audio: prismic.LinkToMediaField<prismic.FieldState, never>;
	
	/**
	 * Embed (Spotify, SoundCloud, Bandcamp…) field in *Music → Default → Primary → Tracks*
	 *
	 * - **Field Type**: Embed
	 * - **Placeholder**: *None*
	 * - **API ID Path**: music.default.primary.tracks[].embed
	 * - **Documentation**: https://prismic.io/docs/fields/embed
	 */
	embed: prismic.EmbedField
	
	/**
	 * Description field in *Music → Default → Primary → Tracks*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: music.default.primary.tracks[].description
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	description: prismic.KeyTextField;
}

/**
 * Primary content in *Music → Default → Primary*
 */
export interface MusicSliceDefaultPrimary {
	/**
	 * Heading field in *Music → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: music.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Tracks field in *Music → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: music.default.primary.tracks[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	tracks: prismic.GroupField<Simplify<MusicSliceDefaultPrimaryTracksItem>>;
}

/**
 * Default variation for Music Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type MusicSliceDefault = prismic.SharedSliceVariation<"default", Simplify<MusicSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Music*
 */
type MusicSliceVariation = MusicSliceDefault

/**
 * Music Shared Slice
 *
 * - **API ID**: `music`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type MusicSlice = prismic.SharedSlice<"music", MusicSliceVariation>;

/**
 * Item in *Slop Gallery → Default → Primary → Items*
 */
export interface SlopGallerySliceDefaultPrimaryItemsItem {
	/**
	 * Image field in *Slop Gallery → Default → Primary → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slop_gallery.default.primary.items[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Caption (confidently wrong) field in *Slop Gallery → Default → Primary → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slop_gallery.default.primary.items[].caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
	
	/**
	 * AI confidence (%) field in *Slop Gallery → Default → Primary → Items*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slop_gallery.default.primary.items[].confidence
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	confidence: prismic.NumberField;
}

/**
 * Primary content in *Slop Gallery → Default → Primary*
 */
export interface SlopGallerySliceDefaultPrimary {
	/**
	 * Heading field in *Slop Gallery → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slop_gallery.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Items field in *Slop Gallery → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slop_gallery.default.primary.items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	items: prismic.GroupField<Simplify<SlopGallerySliceDefaultPrimaryItemsItem>>;
}

/**
 * Default variation for Slop Gallery Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type SlopGallerySliceDefault = prismic.SharedSliceVariation<"default", Simplify<SlopGallerySliceDefaultPrimary>, never>;

/**
 * Slice variation for *Slop Gallery*
 */
type SlopGallerySliceVariation = SlopGallerySliceDefault

/**
 * Slop Gallery Shared Slice
 *
 * - **API ID**: `slop_gallery`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type SlopGallerySlice = prismic.SharedSlice<"slop_gallery", SlopGallerySliceVariation>;

/**
 * Primary content in *The Bar → Default → Primary*
 */
export interface TheBarSliceDefaultPrimary {
	/**
	 * Heading field in *The Bar → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: the_bar.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Bar name field in *The Bar → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: the_bar.default.primary.bar_name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	bar_name: prismic.KeyTextField;
	
	/**
	 * Description field in *The Bar → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: the_bar.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Address field in *The Bar → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: the_bar.default.primary.address
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	address: prismic.KeyTextField;
	
	/**
	 * Location field in *The Bar → Default → Primary*
	 *
	 * - **Field Type**: GeoPoint
	 * - **Placeholder**: *None*
	 * - **API ID Path**: the_bar.default.primary.location
	 * - **Documentation**: https://prismic.io/docs/fields/geopoint
	 */
	location: prismic.GeoPointField;
	
	/**
	 * Photo field in *The Bar → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: the_bar.default.primary.photo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photo: prismic.ImageField<never>;
	
	/**
	 * Map link field in *The Bar → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: the_bar.default.primary.map_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	map_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for The Bar Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TheBarSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TheBarSliceDefaultPrimary>, never>;

/**
 * Slice variation for *The Bar*
 */
type TheBarSliceVariation = TheBarSliceDefault

/**
 * The Bar Shared Slice
 *
 * - **API ID**: `the_bar`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TheBarSlice = prismic.SharedSlice<"the_bar", TheBarSliceVariation>;

/**
 * Primary content in *Video → Default → Primary*
 */
export interface VideoSliceDefaultPrimary {
	/**
	 * Heading field in *Video → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: video.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Video (YouTube, Vimeo, Instagram…) field in *Video → Default → Primary*
	 *
	 * - **Field Type**: Embed
	 * - **Placeholder**: *None*
	 * - **API ID Path**: video.default.primary.video
	 * - **Documentation**: https://prismic.io/docs/fields/embed
	 */
	video: prismic.EmbedField
	
	/**
	 * Caption field in *Video → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: video.default.primary.caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
}

/**
 * Default variation for Video Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type VideoSliceDefault = prismic.SharedSliceVariation<"default", Simplify<VideoSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Video*
 */
type VideoSliceVariation = VideoSliceDefault

/**
 * Video Shared Slice
 *
 * - **API ID**: `video`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type VideoSlice = prismic.SharedSlice<"video", VideoSliceVariation>;

/**
 * Primary content in *Yeaaap Button → Default → Primary*
 */
export interface YeaaapButtonSliceDefaultPrimary {
	/**
	 * Button label field in *Yeaaap Button → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: yeaaap_button.default.primary.label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Counter text (use {count}) field in *Yeaaap Button → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: yeaaap_button.default.primary.counter_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	counter_text: prismic.KeyTextField;
}

/**
 * Default variation for Yeaaap Button Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type YeaaapButtonSliceDefault = prismic.SharedSliceVariation<"default", Simplify<YeaaapButtonSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Yeaaap Button*
 */
type YeaaapButtonSliceVariation = YeaaapButtonSliceDefault

/**
 * Yeaaap Button Shared Slice
 *
 * - **API ID**: `yeaaap_button`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type YeaaapButtonSlice = prismic.SharedSlice<"yeaaap_button", YeaaapButtonSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			BandMemberDocument,
			BandMemberDocumentData,
			BeerDocument,
			BeerDocumentData,
			GigDocument,
			GigDocumentData,
			HomepageDocument,
			HomepageDocumentData,
			HomepageDocumentDataSlicesSlice,
			PageDocument,
			PageDocumentData,
			PageDocumentDataSlicesSlice,
			SettingsDocument,
			SettingsDocumentData,
			SettingsDocumentDataMarqueeItem,
			SettingsDocumentDataAwayTitlesItem,
			AllDocumentTypes,
			BandMembersSlice,
			BandMembersSliceDefaultPrimaryMembersItem,
			BandMembersSliceDefaultPrimary,
			BandMembersSliceVariation,
			BandMembersSliceDefault,
			BeerCellarSlice,
			BeerCellarSliceDefaultPrimaryBeersItem,
			BeerCellarSliceDefaultPrimary,
			BeerCellarSliceVariation,
			BeerCellarSliceDefault,
			ChaosHeroSlice,
			ChaosHeroSliceDefaultPrimary,
			ChaosHeroSliceVariation,
			ChaosHeroSliceDefault,
			GigListSlice,
			GigListSliceDefaultPrimary,
			GigListSliceVariation,
			GigListSliceDefault,
			ManifestoSlice,
			ManifestoSliceDefaultPrimary,
			ManifestoSliceVariation,
			ManifestoSliceDefault,
			MusicSlice,
			MusicSliceDefaultPrimaryTracksItem,
			MusicSliceDefaultPrimary,
			MusicSliceVariation,
			MusicSliceDefault,
			SlopGallerySlice,
			SlopGallerySliceDefaultPrimaryItemsItem,
			SlopGallerySliceDefaultPrimary,
			SlopGallerySliceVariation,
			SlopGallerySliceDefault,
			TheBarSlice,
			TheBarSliceDefaultPrimary,
			TheBarSliceVariation,
			TheBarSliceDefault,
			VideoSlice,
			VideoSliceDefaultPrimary,
			VideoSliceVariation,
			VideoSliceDefault,
			YeaaapButtonSlice,
			YeaaapButtonSliceDefaultPrimary,
			YeaaapButtonSliceVariation,
			YeaaapButtonSliceDefault
		}
	}
}
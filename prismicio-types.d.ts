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
	 * Short bio field in *Band Member*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: band_member.bio
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	bio: prismic.RichTextField;
	
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
 * Item in *Easter eggs → Easter eggs*
 */
export interface EasterEggsDocumentDataEggsItem {
	/**
	 * Egg field in *Easter eggs → Easter eggs*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: easter_eggs.eggs[].egg
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	egg: prismic.SelectField<"konami" | "mrs" | "beer" | "martin" | "vincent" | "slop" | "desert" | "fresco" | "falling" | "toerack" | "yeaaap" | "drunk" | "away" | "logo" | "pick" | "cookies" | "lost" | "bottom">;
	
	/**
	 * Name (shown when found) field in *Easter eggs → Easter eggs*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: easter_eggs.eggs[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Pop-ups (one per paragraph) field in *Easter eggs → Easter eggs*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: easter_eggs.eggs[].messages
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	messages: prismic.RichTextField;
}

/**
 * Content for Easter eggs documents
 */
interface EasterEggsDocumentData {
	/**
	 * Easter eggs field in *Easter eggs*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: easter_eggs.eggs[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	eggs: prismic.GroupField<Simplify<EasterEggsDocumentDataEggsItem>>;
}

/**
 * Easter eggs document from Prismic
 *
 * - **API ID**: `easter_eggs`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type EasterEggsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<EasterEggsDocumentData>, "easter_eggs", Lang>;

/**
 * Item in *Gig → Photos*
 */
export interface GigDocumentDataPhotosItem {
	/**
	 * Photo field in *Gig → Photos*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.photos[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Caption field in *Gig → Photos*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.photos[].caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
}

/**
 * Item in *Gig → Video clips*
 */
export interface GigDocumentDataClipsItem {
	/**
	 * Title field in *Gig → Video clips*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.clips[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Video file field in *Gig → Video clips*
	 *
	 * - **Field Type**: Link to Media
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.clips[].file
	 * - **Documentation**: https://prismic.io/docs/fields/link-to-media
	 */
	file: prismic.LinkToMediaField<prismic.FieldState, never>;
	
	/**
	 * Or embed (YouTube, Instagram…) field in *Gig → Video clips*
	 *
	 * - **Field Type**: Embed
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.clips[].embed
	 * - **Documentation**: https://prismic.io/docs/fields/embed
	 */
	embed: prismic.EmbedField
}

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
	
	/**
	 * Set list field in *Gig*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.setlist
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	setlist: prismic.RichTextField;
	
	/**
	 * Highlight of the night field in *Gig*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.highlight
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	highlight: prismic.KeyTextField;
	
	/**
	 * Photos field in *Gig*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.photos[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	photos: prismic.GroupField<Simplify<GigDocumentDataPhotosItem>>;
	
	/**
	 * Video clips field in *Gig*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig.clips[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	clips: prismic.GroupField<Simplify<GigDocumentDataClipsItem>>;
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

type HomepageDocumentDataSlicesSlice = ChaosHeroSlice | BandMembersSlice | BeerCellarSlice | GigListSlice | YeaaapButtonSlice | TheBarSlice | VideoSlice | ManifestoSlice | SlopGallerySlice | MusicSlice | MerchTableSlice | PhotoGallerySlice

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

type PageDocumentDataSlicesSlice = ChaosHeroSlice | BandMembersSlice | BeerCellarSlice | GigListSlice | YeaaapButtonSlice | TheBarSlice | VideoSlice | ManifestoSlice | SlopGallerySlice | MusicSlice | MerchTableSlice | PhotoGallerySlice

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
 * Item in *Settings → Shouts (cut-outs that pop up with a speech bubble)*
 */
export interface SettingsDocumentDataShoutsItem {
	/**
	 * Who field in *Settings → Shouts (cut-outs that pop up with a speech bubble)*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.shouts[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Cut-out (transparent PNG) field in *Settings → Shouts (cut-outs that pop up with a speech bubble)*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.shouts[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * What they shout field in *Settings → Shouts (cut-outs that pop up with a speech bubble)*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.shouts[].text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
	
	/**
	 * Mouth position across (% from left) field in *Settings → Shouts (cut-outs that pop up with a speech bubble)*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: 50
	 * - **API ID Path**: settings.shouts[].mouth_x
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	mouth_x: prismic.NumberField;
	
	/**
	 * Mouth position down (% from top) field in *Settings → Shouts (cut-outs that pop up with a speech bubble)*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: 25
	 * - **API ID Path**: settings.shouts[].mouth_y
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	mouth_y: prismic.NumberField;
}

/**
 * Item in *Settings → Languages*
 */
export interface SettingsDocumentDataLanguagesItem {
	/**
	 * Code field in *Settings → Languages*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.languages[].code
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	code: prismic.KeyTextField;
	
	/**
	 * Switcher label field in *Settings → Languages*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.languages[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Name (in the toast) field in *Settings → Languages*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.languages[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Cool and good phrase field in *Settings → Languages*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.languages[].phrase
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	phrase: prismic.KeyTextField;
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
	
	/**
	 * Shouts (cut-outs that pop up with a speech bubble) field in *Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.shouts[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	shouts: prismic.GroupField<Simplify<SettingsDocumentDataShoutsItem>>;
	
	/**
	 * Logo field in *Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.logo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * Default page description field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.meta_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Languages field in *Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.languages[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	languages: prismic.GroupField<Simplify<SettingsDocumentDataLanguagesItem>>;
	
	/**
	 * Default page title field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: MRS — rock, grunge and punk from Paris
	 * - **API ID Path**: settings.meta_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Sign-off field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Stay {cool}. ({cool} is the phrase in the chosen language)
	 * - **API ID Path**: settings.sign_off
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sign_off: prismic.KeyTextField;/**
	 * Under construction banner field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.under_construction
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	under_construction: prismic.KeyTextField;
	
	/**
	 * AI joke field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Put [square brackets] around the hidden slop-mode link
	 * - **API ID Path**: settings.ai_disclaimer
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	ai_disclaimer: prismic.KeyTextField;
	
	/**
	 * Made in field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Put [square brackets] around the hidden desert link
	 * - **API ID Path**: settings.made_in
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	made_in: prismic.KeyTextField;
	
	/**
	 * Instagram link text field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.instagram_label
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	instagram_label: prismic.KeyTextField;
	
	/**
	 * Visitor counter label field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.visitor_label
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	visitor_label: prismic.KeyTextField;
	
	/**
	 * Easter egg counter label field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.egg_counter_label
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	egg_counter_label: prismic.KeyTextField;
	
	/**
	 * Netscape line field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.netscape
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	netscape: prismic.KeyTextField;
	
	/**
	 * Hint field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.hint
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	hint: prismic.KeyTextField;/**
	 * Mosh pit button field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.mosh_label
	 * - **Tab**: Buttons & pop-ups
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	mosh_label: prismic.KeyTextField;
	
	/**
	 * Pop-up when the mosh pit starts field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.mosh_message
	 * - **Tab**: Buttons & pop-ups
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	mosh_message: prismic.KeyTextField;
	
	/**
	 * Drunk mode button field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.drunk_label
	 * - **Tab**: Buttons & pop-ups
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	drunk_label: prismic.KeyTextField;
	
	/**
	 * Sober mode button field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.sober_label
	 * - **Tab**: Buttons & pop-ups
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sober_label: prismic.KeyTextField;
	
	/**
	 * Pop-up when switching to sober field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.sober_on_message
	 * - **Tab**: Buttons & pop-ups
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sober_on_message: prismic.KeyTextField;
	
	/**
	 * Pop-up when switching back to drunk field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.sober_off_message
	 * - **Tab**: Buttons & pop-ups
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sober_off_message: prismic.KeyTextField;
	
	/**
	 * Beer policy text field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.cookie_text
	 * - **Tab**: Buttons & pop-ups
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cookie_text: prismic.KeyTextField;
	
	/**
	 * Beer policy text, second time field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.cookie_text_again
	 * - **Tab**: Buttons & pop-ups
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cookie_text_again: prismic.KeyTextField;
	
	/**
	 * Accept button field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.cookie_accept
	 * - **Tab**: Buttons & pop-ups
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cookie_accept: prismic.KeyTextField;
	
	/**
	 * Also accept button field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.cookie_also_accept
	 * - **Tab**: Buttons & pop-ups
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cookie_also_accept: prismic.KeyTextField;
	
	/**
	 * Decline button field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.cookie_decline
	 * - **Tab**: Buttons & pop-ups
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cookie_decline: prismic.KeyTextField;
	
	/**
	 * Pop-up when clicking decline field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.cookie_decline_message
	 * - **Tab**: Buttons & pop-ups
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cookie_decline_message: prismic.KeyTextField;
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

export type AllDocumentTypes = BandMemberDocument | BeerDocument | EasterEggsDocument | GigDocument | HomepageDocument | PageDocument | SettingsDocument;

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
	member: ContentRelationshipFieldWithData<[{"fields":["name","instrument","photo","bio","weird_fact","shake_level"],"id":"band_member"}]>;
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
	
	/**
	 * Side effects label field in *Beer Cellar → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer_cellar.default.primary.side_effects_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	side_effects_label: prismic.KeyTextField;
	
	/**
	 * Pour button field in *Beer Cellar → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer_cellar.default.primary.pour_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	pour_label: prismic.KeyTextField;
	
	/**
	 * Pour pop-up ({beer} is the beer name) field in *Beer Cellar → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer_cellar.default.primary.pour_message
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	pour_message: prismic.KeyTextField;
	
	/**
	 * Missing label text field in *Beer Cellar → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beer_cellar.default.primary.missing_label_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	missing_label_text: prismic.KeyTextField;
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
	
	/**
	 * Top sticker field in *Chaos Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: chaos_hero.default.primary.sticker_top
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sticker_top: prismic.KeyTextField;
	
	/**
	 * Bottom sticker field in *Chaos Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: chaos_hero.default.primary.sticker_bottom
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sticker_bottom: prismic.KeyTextField;
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
	
	/**
	 * Tickets button field in *Gig List → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig_list.default.primary.tickets_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	tickets_label: prismic.KeyTextField;
	
	/**
	 * Photos link text field in *Gig List → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig_list.default.primary.evidence_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	evidence_label: prismic.KeyTextField;
	
	/**
	 * Missing poster text field in *Gig List → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig_list.default.primary.missing_poster_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	missing_poster_text: prismic.KeyTextField;
	
	/**
	 * Missing date text field in *Gig List → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig_list.default.primary.missing_date_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	missing_date_text: prismic.KeyTextField;
	
	/**
	 * Photos link text when there are no clips field in *Gig List → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gig_list.default.primary.evidence_label_no_clips
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	evidence_label_no_clips: prismic.KeyTextField;
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
 * Item in *Merch Table → Default → Primary → Items*
 */
export interface MerchTableSliceDefaultPrimaryItemsItem {
	/**
	 * Image field in *Merch Table → Default → Primary → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.items[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Name field in *Merch Table → Default → Primary → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.items[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Price (€) field in *Merch Table → Default → Primary → Items*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.items[].price
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	price: prismic.NumberField;
	
	/**
	 * Sizes field in *Merch Table → Default → Primary → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.items[].sizes
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sizes: prismic.KeyTextField;
	
	/**
	 * Description field in *Merch Table → Default → Primary → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.items[].description
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	description: prismic.KeyTextField;
	
	/**
	 * Stock field in *Merch Table → Default → Primary → Items*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: in stock
	 * - **API ID Path**: merch_table.default.primary.items[].stock
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	stock: prismic.SelectField<"in stock" | "almost gone" | "sold out" | "only at gigs" | "does not exist", "filled">;
}

/**
 * Item in *Merch Table → Default → Primary → Cart pop-ups*
 */
export interface MerchTableSliceDefaultPrimaryCartMessagesItem {
	/**
	 * Pop-up field in *Merch Table → Default → Primary → Cart pop-ups*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.cart_messages[].text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
}

/**
 * Primary content in *Merch Table → Default → Primary*
 */
export interface MerchTableSliceDefaultPrimary {
	/**
	 * Heading field in *Merch Table → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Intro field in *Merch Table → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.intro
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	intro: prismic.RichTextField;
	
	/**
	 * Items field in *Merch Table → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	items: prismic.GroupField<Simplify<MerchTableSliceDefaultPrimaryItemsItem>>;
	
	/**
	 * How to buy (link) field in *Merch Table → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.buy_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	buy_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Add to cart button field in *Merch Table → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.add_to_cart_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	add_to_cart_label: prismic.KeyTextField;
	
	/**
	 * In cart button ({count} is the number of clicks) field in *Merch Table → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.in_cart_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	in_cart_label: prismic.KeyTextField;
	
	/**
	 * Sold-out button field in *Merch Table → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.sold_out_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sold_out_label: prismic.KeyTextField;
	
	/**
	 * Sizes label field in *Merch Table → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.sizes_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sizes_label: prismic.KeyTextField;
	
	/**
	 * Buy link text field in *Merch Table → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.buy_link_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	buy_link_label: prismic.KeyTextField;
	
	/**
	 * Cart pop-ups field in *Merch Table → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: merch_table.default.primary.cart_messages[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	cart_messages: prismic.GroupField<Simplify<MerchTableSliceDefaultPrimaryCartMessagesItem>>;
}

/**
 * Default variation for Merch Table Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type MerchTableSliceDefault = prismic.SharedSliceVariation<"default", Simplify<MerchTableSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Merch Table*
 */
type MerchTableSliceVariation = MerchTableSliceDefault

/**
 * Merch Table Shared Slice
 *
 * - **API ID**: `merch_table`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type MerchTableSlice = prismic.SharedSlice<"merch_table", MerchTableSliceVariation>;

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
 * Item in *Photo Gallery → Default → Primary → Photos*
 */
export interface PhotoGallerySliceDefaultPrimaryPhotosItem {
	/**
	 * Photo field in *Photo Gallery → Default → Primary → Photos*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: photo_gallery.default.primary.photos[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Caption field in *Photo Gallery → Default → Primary → Photos*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: photo_gallery.default.primary.photos[].caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
}

/**
 * Primary content in *Photo Gallery → Default → Primary*
 */
export interface PhotoGallerySliceDefaultPrimary {
	/**
	 * Heading field in *Photo Gallery → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: photo_gallery.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Photos field in *Photo Gallery → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: photo_gallery.default.primary.photos[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	photos: prismic.GroupField<Simplify<PhotoGallerySliceDefaultPrimaryPhotosItem>>;
}

/**
 * Default variation for Photo Gallery Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PhotoGallerySliceDefault = prismic.SharedSliceVariation<"default", Simplify<PhotoGallerySliceDefaultPrimary>, never>;

/**
 * Slice variation for *Photo Gallery*
 */
type PhotoGallerySliceVariation = PhotoGallerySliceDefault

/**
 * Photo Gallery Shared Slice
 *
 * - **API ID**: `photo_gallery`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PhotoGallerySlice = prismic.SharedSlice<"photo_gallery", PhotoGallerySliceVariation>;

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
			EasterEggsDocument,
			EasterEggsDocumentData,
			EasterEggsDocumentDataEggsItem,
			GigDocument,
			GigDocumentData,
			GigDocumentDataPhotosItem,
			GigDocumentDataClipsItem,
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
			SettingsDocumentDataShoutsItem,
			SettingsDocumentDataLanguagesItem,
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
			MerchTableSlice,
			MerchTableSliceDefaultPrimaryItemsItem,
			MerchTableSliceDefaultPrimaryCartMessagesItem,
			MerchTableSliceDefaultPrimary,
			MerchTableSliceVariation,
			MerchTableSliceDefault,
			MusicSlice,
			MusicSliceDefaultPrimaryTracksItem,
			MusicSliceDefaultPrimary,
			MusicSliceVariation,
			MusicSliceDefault,
			PhotoGallerySlice,
			PhotoGallerySliceDefaultPrimaryPhotosItem,
			PhotoGallerySliceDefaultPrimary,
			PhotoGallerySliceVariation,
			PhotoGallerySliceDefault,
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
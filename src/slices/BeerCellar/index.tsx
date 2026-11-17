import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BeerCellar`.
 */
export type BeerCellarProps = SliceComponentProps<Content.BeerCellarSlice>;

/**
 * Component for "Beer Cellar" Slices.
 */
const BeerCellar: FC<BeerCellarProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			Placeholder component for {slice.slice_type} (variation: {slice.variation}) slices.
			<br />
			<strong>You can edit this slice directly in your code editor.</strong>
		</section>
	)
};

export default BeerCellar
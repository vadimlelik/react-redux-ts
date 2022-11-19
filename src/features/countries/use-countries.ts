import { Country } from "./../../types/country";
import { RootState, useAppDispatch } from "./../../store";
import {
  selectVisibleCountries,
  selectCountriesInfo,
} from "./countries-selector";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { selectControls } from "../controls/controls-slice";
import { loadCountries } from "./countries-slice";

export const useCountries = (): [
  Country[],
  ReturnType<typeof selectCountriesInfo>
] => {
  const dispatch = useAppDispatch();
  const controls = useSelector(selectControls);
  const countries = useSelector((state: RootState) =>
    selectVisibleCountries(state, controls)
  );
  const { status, error, qty } = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return [countries, { status, error, qty }];
};

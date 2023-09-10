'use client';

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

type Props = {}

const CrispConfig = (props: Props) => {

  useEffect(() => {

    Crisp.configure("6b314ff2-ecf1-4ee4-97a4-4b0760350348"); //ID from Crisp website
  }, []);

  return null;
}

export default CrispConfig;
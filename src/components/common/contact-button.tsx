import { FC, PropsWithChildren } from "react";
import { Button } from "antd";

type TProps = {
  onClick: () => void;
};

export const ContactButton: FC<PropsWithChildren<TProps>> = ({
  onClick,
  children,
}) => (
  <Button type="primary" onClick={onClick}>
    {children}
  </Button>
);

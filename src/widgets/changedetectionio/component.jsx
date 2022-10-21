import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();

  const { widget } = service;

  const { data } = useWidgetAPI(widget, "info");

  if (!data) {
    return <Container error="widget.api_error" />;
  }

  const totalObserved = Object.keys(data).length;
  let diffsDetected = 0;

  Object.keys(data).forEach((key) => {
    if (data[key].last_checked === data[key].last_changed) {
      diffsDetected += 1;
    }
  });

  return (
    <Container service={service}>
      <Block label="changedetectionio.diffsDetected" value={t("common.number", { value: diffsDetected })} />
      <Block label="changedetectionio.totalObserved" value={t("common.number", { value: totalObserved })} />
    </Container>
  );
}

import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useAtomValue } from "jotai";
import { fileToRelease } from "@/app/store/atoms/editfile";
import WaveSurferComp from "./WaveSurferComp";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const toReleaseFile = useAtomValue(fileToRelease);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {toReleaseFile.source.map((src, index) => (
        <Accordion key={index} expanded={expanded} onChange={handleToggle}>
          <AccordionSummary
            aria-controls={`panel${index}d-content`}
            id={`panel${index}d-header`}
          >
            <Typography>{src.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <WaveSurferComp
              musicPath={src.url}
              musicname={src.name}
              type="source"
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

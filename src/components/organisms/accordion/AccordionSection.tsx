import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    BoxProps,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import { ReactNode } from "react";
  
  type AccordionSectionProps = {
    title: string;
    children: ReactNode;
    /** Empieza abierto; por defecto cerrado */
    defaultExpanded?: boolean;
    /** Ajustes extra de estilo para el <Accordion/> */
    sx?: BoxProps["sx"];
  };
  
  export const AccordionSection = ({
    title,
    children,
    defaultExpanded = false,
    sx,
  }: AccordionSectionProps) => (
    <Accordion defaultExpanded={defaultExpanded} sx={{ mt: 2, ...sx }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
        sx={{ px: 2 }}
      >
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </AccordionSummary>
  
      {/* p:0 quita padding lateral, pt:2 deja separación superior */}
      <AccordionDetails sx={{ p: 0, pt: 2 }}>{children}</AccordionDetails>
    </Accordion>
  );
  
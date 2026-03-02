import { sowSampleData } from "../../../proposal-data/data";
import { SowDocument } from "@/src/proposals/sow/SowDocument";

export const metadata = {
  title: "SOW Proposal",
};

export default function SowProposalPage() {
  return <SowDocument data={sowSampleData} />;
}

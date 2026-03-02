import ArcronLogo from "@/src/components/ArcronLogo";
import { contactLine, money } from "./formatters";
import type { SOWData } from "./types";
import OutlineText from "@/src/components/OutlineText";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="sow-bullets">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function SowDocument({ data }: { data: SOWData | undefined }) {
  if (!data) return null;
  const primaryClient = data.client.primaryContacts?.[0];

  const legalLines: string[] = [];
  if (data.legal.governedByMsa) {
    legalLines.push(
      data.legal.msaName
        ? `This SOW is governed by the ${data.legal.msaName}.`
        : "This SOW is governed by the Master Services Agreement (MSA) between the parties.",
    );
  }
  if (data.legal.notes?.length) legalLines.push(...data.legal.notes);

  return (
    <div className="sow-page-wrap">
      <article className="sow-page" data-sow-ready="true">
        <div className="sow-topbar">
          <div className="sow-brand">
            <ArcronLogo width={"275px"} />
          </div>
          <div className="sow-meta">
            <div>
              <span className="sow-label">SOW</span> {data.sowNumber ?? "—"}
            </div>
            <div>
              <span className="sow-label">Version</span> {data.version ?? "1.0"}
            </div>
            <div>
              <span className="sow-label">Date</span> {data.date}
            </div>
          </div>
        </div>

        <div className="sow-hero">
          <div>
            <OutlineText text="Statement of Work" size="md" />
            <p className="sow-p">{data.intro.summary}</p>
          </div>

          <div className="sow-card sow-herocard">
            <div className="sow-kicker">Project Snapshot</div>
            <div className="sow-herogrid">
              <div className="sow-info">
                <div className="sow-info-k">Project</div>
                <div className="sow-info-v">{data.projectName}</div>
              </div>
              <div className="sow-info">
                <div className="sow-info-k">Client</div>
                <div className="sow-info-v">{data.clientName}</div>
              </div>
              <div className="sow-info">
                <div className="sow-info-k">Target Start Date</div>
                <div className="sow-info-v">
                  {data.engagement.startDate ?? "TBD"}
                </div>
              </div>
              <div className="sow-info">
                <div className="sow-info-k">Target End Date</div>
                <div className="sow-info-v">
                  {data.engagement.targetEndDate ?? "TBD"}
                </div>
              </div>
            </div>
            <div className="sow-muted">
              <p className="sow-label">Primary POC</p>
              <p className="sow-p">
                {primaryClient ? contactLine(primaryClient) : "TBD"}
              </p>
            </div>
          </div>
        </div>

        <div className="sow-divider" />

        <section className="sow-section">
          <OutlineText text="Points of Contact" size="sm" />
          <div className="sow-grid2">
            <div className="sow-card">
              <div className="sow-card-title-sm">Client</div>
              <div className="sow-muted">
                <span className="sow-label">Legal name</span>{" "}
                <span className="sow-p">{data.client.legalName}</span>
              </div>
              {data.client.addressLine && (
                <div className="sow-muted">
                  <span className="sow-label">Address</span>{" "}
                  <span className="sow-p">{data.client.addressLine}</span>
                </div>
              )}
              <div className="sow-muted">
                <span className="sow-label">Contacts</span>
              </div>
              <Bullets items={data.client.primaryContacts.map(contactLine)} />
            </div>

            <div className="sow-card">
              <div className="sow-card-title-sm">Arcron</div>
              <div className="sow-muted">
                <span className="sow-label">Company</span>{" "}
                <span className="sow-p">{data.arcron.companyName}</span>
              </div>
              <div className="sow-muted">
                <span className="sow-label">Website</span>{" "}
                <span className="sow-p">
                  <a
                    href={data.arcron.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.arcron.website}
                  </a>
                </span>
              </div>
              {data.arcron.addressLine && (
                <div className="sow-muted">
                  <span className="sow-label">Address</span>{" "}
                  <span className="sow-p">{data.arcron.addressLine}</span>
                </div>
              )}
              <div className="sow-muted">
                <span className="sow-label">Primary</span>{" "}
                <span className="sow-p">
                  {contactLine(data.arcron.primaryContact)}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="sow-section">
          <OutlineText text="Success Criteria" size="sm" />
          <div className="sow-card">
            <div className="sow-card-title-sm">Success Criteria</div>
            <Bullets items={data.objective.successLooksLike} />
          </div>
        </section>

        {data.phases.length ? (
          <section className="sow-section">
            <OutlineText text="Scope &amp; Delivery Plan" size="sm" />
            <div className="sow-cards">
              {data.phases.map((phase, idx) => (
                <div className="sow-card" key={`${phase.name}-${idx}`}>
                  <div className="sow-card-top">
                    <div className="sow-kicker">{`// Phase ${idx + 1}`}</div>
                    <div className="sow-card-title">{phase.name}</div>
                    <div className="sow-card-meta">
                      {phase.duration && (
                        <span className="sow-chip">{phase.duration}</span>
                      )}
                      {phase.fee && (
                        <span className="sow-chip sow-chip-strong">
                          {money(phase.fee)}
                        </span>
                      )}
                    </div>
                  </div>
                  {phase.goal && (
                    <div className="sow-muted">
                      <p className="sow-label">Goal</p>
                      <p className="sow-p">{phase.goal}</p>
                    </div>
                  )}
                  {phase.activities?.length ? (
                    <div className="sow-section-sub">
                      <span className="sow-label">Activities</span>
                      <Bullets items={phase.activities} />
                    </div>
                  ) : null}
                  {phase.deliverables?.length ? (
                    <div className="sow-section-sub">
                      <span className="sow-label">Deliverables</span>
                      <Bullets items={phase.deliverables} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <></>
        )}

        <section className="sow-section">
          <OutlineText text="Detailed Scope" size="sm" />
          <div className="sow-cards">
            {data.scope.sections.map((section) => (
              <div className="sow-card" key={section.title}>
                <div className="sow-card-title-sm">{section.title}</div>
                <Bullets items={section.bullets} />
              </div>
            ))}
          </div>
        </section>

        <section className="sow-section">
          <OutlineText text="Deliverables &amp; Acceptance" size="sm" />
          <div className="sow-grid2">
            <div className="sow-card">
              <div className="sow-card-title-sm">Deliverables Summary</div>
              <Bullets items={data.deliverables.summary} />
            </div>
            <div className="sow-card">
              <div className="sow-card-title-sm">Acceptance Criteria</div>
              <Bullets items={data.deliverables.acceptanceCriteria} />
            </div>
          </div>
        </section>

        <section className="sow-section">
          <OutlineText text="Out of Scope" size="sm" />
          <div className="sow-card">
            <Bullets items={data.outOfScope} />
          </div>
        </section>

        <section className="sow-section">
          <OutlineText
            text="Assumptions, Responsibilities, &amp; Dependencies"
            size="sm"
          />

          <div className="sow-grid2">
            <div className="sow-card">
              <div className="sow-card-title-sm">Client</div>
              <Bullets items={data.clientAssumptions} />
            </div>
            <div className="sow-card">
              <div className="sow-card-title-sm">Arcron</div>
              <Bullets items={data.arcronAssumptions} />
            </div>
          </div>
        </section>

        <section className="sow-section">
          <OutlineText text="Investment &amp; Payment Terms" size="sm" />
          <PricingSection data={data} />
          {data.pricing.passThroughCosts?.length ? (
            <div className="sow-card">
              <div className="sow-card-title-sm">
                Pass-through / Third-party Costs
              </div>
              <div className="sow-table">
                <div className="sow-tr sow-th">
                  <div className="sow-td">Item</div>
                  <div className="sow-td sow-right">Estimate</div>
                  <div className="sow-td">Notes</div>
                </div>
                {data.pricing.passThroughCosts.map((item) => (
                  <div className="sow-tr" key={item.item}>
                    <div className="sow-td">{item.item}</div>
                    <div className="sow-td sow-right">
                      {item.estimate ? money(item.estimate) : ""}
                    </div>
                    <div className="sow-td sow-muted">{item.notes ?? ""}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <section className="sow-section">
          <OutlineText text="Change Management" size="sm" />
          <div className="sow-card">
            <p className="sow-p">
              {data.changeManagement.text ??
                "Any changes to scope, timeline, or deliverables require a written Change Order signed by both parties. Changes may impact cost and schedule."}
            </p>
          </div>
        </section>

        <section className="sow-section">
          <OutlineText text="Communication &amp; Reporting" size="sm" />
          <div className="sow-grid2">
            <div className="sow-card">
              <div className="sow-card-title-sm">Cadence</div>
              <Bullets items={data.communication.cadenceBullets} />
            </div>
            <div className="sow-card">
              <div className="sow-card-title-sm">Artifacts</div>
              <Bullets items={data.communication.artifactsBullets} />
            </div>
          </div>
        </section>

        <section className="sow-section">
          <OutlineText text="Legal" size="sm" />
          <div className="sow-card">
            {legalLines.length ? (
              <Bullets items={legalLines} />
            ) : (
              <div className="sow-muted">
                This SOW is intended to describe scope and delivery. Contractual
                terms (IP, confidentiality, liability, termination) are governed
                by the parties&apos; agreement(s).
              </div>
            )}
          </div>
        </section>

        <section className="sow-section">
          <OutlineText text="Signatures" size="sm" />
          <div className="sow-sign-row">
            <div className="sow-sig">
              <div>
                <div className="sow-who">{data.client.legalName}</div>
                <div className="sow-small">
                  {contactLine(
                    data.signatures.clientSigner ?? {
                      name: "Authorized Signer",
                      title: "",
                      email: "",
                    },
                  )}
                </div>
              </div>
              <div>
                <div className="sow-line" />
                <div className="sow-small">Signature • Date</div>
              </div>
            </div>
            <div className="sow-sig">
              <div>
                <div className="sow-who">{data.arcron.companyName}</div>
                <div className="sow-small">
                  {contactLine(
                    data.signatures.arcronSigner ?? data.arcron.primaryContact,
                  )}
                </div>
              </div>
              <div>
                <div className="sow-line" />
                <div className="sow-small">Signature • Date</div>
              </div>
            </div>
          </div>
        </section>

        <div className="sow-footer">
          <div>{data.arcron.companyName}</div>
          <div>
            {data.projectName} • {data.clientName}
          </div>
        </div>
      </article>
    </div>
  );
}

function PricingSection({ data }: { data: SOWData }) {
  if (data.pricing.model === "fixed_by_phase") {
    return (
      <div className="sow-card mb-8">
        <div className="sow-card-title-sm">
          Pricing Model: Fixed Fee (by Phase)
        </div>
        <div className="sow-table">
          <div className="sow-tr sow-th">
            <div className="sow-td">Phase</div>
            <div className="sow-td">Description</div>
            <div className="sow-td sow-right">Fee</div>
          </div>
          {data.phases.map((phase) => (
            <div className="sow-tr" key={phase.name}>
              <div className="sow-td">{phase.name}</div>
              <div className="sow-td sow-muted">{phase.goal ?? ""}</div>
              <div className="sow-td sow-right">
                {phase.fee ? money(phase.fee) : ""}
              </div>
            </div>
          ))}
          {data.pricing.fixedTotal ? (
            <div className="sow-tr sow-total">
              <div className="sow-td" />
              <div className="sow-td sow-right">
                <span className="sow-label">Total</span>
              </div>
              <div className="sow-td sow-right">
                {money(data.pricing.fixedTotal)}
              </div>
            </div>
          ) : null}
        </div>
        {data.pricing.invoiceCadence ? (
          <div className="sow-muted mt-2">
            <span className="sow-label">Invoicing:</span>{" "}
            <span className="sow-p">{data.pricing.invoiceCadence}</span>
          </div>
        ) : null}
        {data.pricing.paymentTerms ? (
          <div className="sow-muted">
            <span className="sow-label">Payment terms:</span>{" "}
            <span className="sow-p">{data.pricing.paymentTerms}</span>
          </div>
        ) : null}
      </div>
    );
  }

  if (data.pricing.model === "time_and_materials") {
    return (
      <div className="sow-card">
        <div className="sow-card-title-sm">
          Pricing Model: Time &amp; Materials
        </div>
        <div className="sow-grid2">
          <div className="sow-pill">
            <div className="sow-pill-k">Rate</div>
            <div className="sow-pill-v">
              {money(data.pricing.hourlyRate)} {data.pricing.rateLabel ?? ""}
            </div>
          </div>
          <div className="sow-pill">
            <div className="sow-pill-k">Estimated Hours</div>
            <div className="sow-pill-v">
              {data.pricing.estimatedHours
                ? `${data.pricing.estimatedHours.min}-${data.pricing.estimatedHours.max} hrs`
                : "TBD"}
            </div>
          </div>
        </div>
        {data.pricing.invoiceCadence ? (
          <div className="sow-muted mt-2">
            <span className="sow-label">Billing cadence:</span>{" "}
            <span className="sow-p">{data.pricing.invoiceCadence}</span>
          </div>
        ) : null}
        {data.pricing.paymentTerms ? (
          <div className="sow-muted">
            <span className="sow-label">Payment terms:</span>{" "}
            <span className="sow-p">{data.pricing.paymentTerms}</span>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="sow-card">
      <div className="sow-card-title-sm">Pricing Model: Retainer</div>
      <div className="sow-muted">
        Define monthly scope, response times, and included hours/deliverables
        here.
      </div>
      {data.pricing.invoiceCadence ? (
        <div className="sow-muted mt-2">
          <span className="sow-label">Billing cadence:</span>{" "}
          <span className="sow-p">{data.pricing.invoiceCadence}</span>
        </div>
      ) : null}
      {data.pricing.paymentTerms ? (
        <div className="sow-muted">
          <span className="sow-label">Payment terms:</span>{" "}
          <span className="sow-p">{data.pricing.paymentTerms}</span>
        </div>
      ) : null}
    </div>
  );
}

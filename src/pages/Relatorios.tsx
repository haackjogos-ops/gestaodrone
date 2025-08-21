import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plane, Droplets, Package, Search, Calendar, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface RelatorioPulverizacao {
  id: string;
  data_voo: string;
  cultura: string;
  produto: string;
  area_hectares: number;
  dose_hectare: number;
  volume_calda: number;
  altura_voo: number;
  velocidade: number;
  temperatura?: number;
  umidade?: number;
  vento_velocidade?: number;
  observacoes?: string;
  created_at: string;
}

interface RelatorioVooAgricola {
  id: string;
  data_voo: string;
  cultura: string;
  tipo_operacao: string;
  area_hectares: number;
  altitude_voo: number;
  velocidade: number;
  tempo_voo: number;
  temperatura?: number;
  umidade?: number;
  vento_velocidade?: number;
  observacoes?: string;
  created_at: string;
}

interface RelatorioSolido {
  id: string;
  data_aplicacao: string;
  cultura: string;
  produto: string;
  area_hectares: number;
  quantidade_kg: number;
  dose_hectare: number;
  altura_aplicacao: number;
  velocidade: number;
  temperatura?: number;
  umidade?: number;
  vento_velocidade?: number;
  observacoes?: string;
  created_at: string;
}

const Relatorios = () => {
  const { user } = useAuth();
  const [pulverizacao, setPulverizacao] = useState<RelatorioPulverizacao[]>([]);
  const [vooAgricola, setVooAgricola] = useState<RelatorioVooAgricola[]>([]);
  const [solido, setSolido] = useState<RelatorioSolido[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
    try {
      setLoading(true);

      // Buscar relatórios de pulverização
      const { data: pulvData } = await supabase
        .from("relatorio_pulverizacao")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      // Buscar relatórios de voo agrícola
      const { data: vooData } = await supabase
        .from("relatorio_voo_agricola")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      // Buscar relatórios de sólido
      const { data: solidoData } = await supabase
        .from("relatorio_solido")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      setPulverizacao(pulvData || []);
      setVooAgricola(vooData || []);
      setSolido(solidoData || []);
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterReports = (reports: any[], term: string) => {
    if (!term) return reports;
    return reports.filter(report => 
      report.cultura?.toLowerCase().includes(term.toLowerCase()) ||
      report.produto?.toLowerCase().includes(term.toLowerCase()) ||
      report.tipo_operacao?.toLowerCase().includes(term.toLowerCase())
    );
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero shadow-agriculture">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button asChild variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Link>
              </Button>
              <FileText className="h-8 w-8 text-primary-foreground" />
              <h1 className="text-2xl font-bold text-primary-foreground">Meus Relatórios</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Search */}
      <section className="py-8 bg-agriculture-light">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cultura, produto ou operação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reports */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="pulverizacao" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pulverizacao" className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                Pulverização ({pulverizacao.length})
              </TabsTrigger>
              <TabsTrigger value="voo-agricola" className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                Voo Agrícola ({vooAgricola.length})
              </TabsTrigger>
              <TabsTrigger value="solido" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Sólidos ({solido.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pulverizacao" className="mt-6">
              <div className="grid gap-4">
                {loading ? (
                  <p className="text-center text-muted-foreground">Carregando relatórios...</p>
                ) : filterReports(pulverizacao, searchTerm).length === 0 ? (
                  <div className="text-center py-8">
                    <Droplets className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhum relatório de pulverização encontrado</p>
                    <Button asChild className="mt-4">
                      <Link to="/pulverizacao">Criar primeiro relatório</Link>
                    </Button>
                  </div>
                ) : (
                  filterReports(pulverizacao, searchTerm).map((report) => (
                    <Card key={report.id} className="shadow-card-custom">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Droplets className="h-5 w-5 text-agriculture-primary" />
                            Pulverização - {report.cultura}
                          </CardTitle>
                          <Badge variant="outline" className="text-agriculture-primary border-agriculture-primary">
                            Concluído
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(report.data_voo)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Produto:</strong> {report.produto}
                          </div>
                          <div>
                            <strong>Área:</strong> {report.area_hectares} ha
                          </div>
                          <div>
                            <strong>Dose:</strong> {report.dose_hectare} L/ha
                          </div>
                          <div>
                            <strong>Altura:</strong> {report.altura_voo} m
                          </div>
                          <div>
                            <strong>Velocidade:</strong> {report.velocidade} km/h
                          </div>
                          <div>
                            <strong>Volume calda:</strong> {report.volume_calda} L
                          </div>
                        </div>
                        {report.observacoes && (
                          <div className="pt-2 border-t">
                            <strong className="text-sm">Observações:</strong>
                            <p className="text-sm text-muted-foreground mt-1">{report.observacoes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="voo-agricola" className="mt-6">
              <div className="grid gap-4">
                {loading ? (
                  <p className="text-center text-muted-foreground">Carregando relatórios...</p>
                ) : filterReports(vooAgricola, searchTerm).length === 0 ? (
                  <div className="text-center py-8">
                    <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhum relatório de voo agrícola encontrado</p>
                    <Button asChild className="mt-4">
                      <Link to="/voo-agricola">Criar primeiro relatório</Link>
                    </Button>
                  </div>
                ) : (
                  filterReports(vooAgricola, searchTerm).map((report) => (
                    <Card key={report.id} className="shadow-card-custom">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Plane className="h-5 w-5 text-agriculture-primary" />
                            Voo Agrícola - {report.cultura}
                          </CardTitle>
                          <Badge variant="outline" className="text-agriculture-primary border-agriculture-primary">
                            Concluído
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(report.data_voo)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Operação:</strong> {report.tipo_operacao}
                          </div>
                          <div>
                            <strong>Área:</strong> {report.area_hectares} ha
                          </div>
                          <div>
                            <strong>Altitude:</strong> {report.altitude_voo} m
                          </div>
                          <div>
                            <strong>Velocidade:</strong> {report.velocidade} km/h
                          </div>
                          <div>
                            <strong>Tempo de voo:</strong> {report.tempo_voo} min
                          </div>
                          {report.temperatura && (
                            <div>
                              <strong>Temperatura:</strong> {report.temperatura}°C
                            </div>
                          )}
                        </div>
                        {report.observacoes && (
                          <div className="pt-2 border-t">
                            <strong className="text-sm">Observações:</strong>
                            <p className="text-sm text-muted-foreground mt-1">{report.observacoes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="solido" className="mt-6">
              <div className="grid gap-4">
                {loading ? (
                  <p className="text-center text-muted-foreground">Carregando relatórios...</p>
                ) : filterReports(solido, searchTerm).length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhum relatório de sólidos encontrado</p>
                    <Button asChild className="mt-4">
                      <Link to="/solido">Criar primeiro relatório</Link>
                    </Button>
                  </div>
                ) : (
                  filterReports(solido, searchTerm).map((report) => (
                    <Card key={report.id} className="shadow-card-custom">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Package className="h-5 w-5 text-agriculture-primary" />
                            Aplicação Sólido - {report.cultura}
                          </CardTitle>
                          <Badge variant="outline" className="text-agriculture-primary border-agriculture-primary">
                            Concluído
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(report.data_aplicacao)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Produto:</strong> {report.produto}
                          </div>
                          <div>
                            <strong>Área:</strong> {report.area_hectares} ha
                          </div>
                          <div>
                            <strong>Quantidade:</strong> {report.quantidade_kg} kg
                          </div>
                          <div>
                            <strong>Dose:</strong> {report.dose_hectare} kg/ha
                          </div>
                          <div>
                            <strong>Altura:</strong> {report.altura_aplicacao} m
                          </div>
                          <div>
                            <strong>Velocidade:</strong> {report.velocidade} km/h
                          </div>
                        </div>
                        {report.observacoes && (
                          <div className="pt-2 border-t">
                            <strong className="text-sm">Observações:</strong>
                            <p className="text-sm text-muted-foreground mt-1">{report.observacoes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Relatorios;